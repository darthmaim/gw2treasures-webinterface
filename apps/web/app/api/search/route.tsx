import { remember } from '@/lib/remember';
import { db } from '@/lib/prisma';
import { Prisma } from '@gw2treasures/database';
import { jsonResponse, UnwrapJsonResponse } from '../helper';
import { decode } from 'gw2e-chat-codes';
import { isTruthy } from '@gw2treasures/ui';

type ChatCode = Exclude<ReturnType<typeof decode>, false>;
type ItemChatCode = { type: 'item', quantity: number, id: number, skin: undefined | number, upgrades: undefined | [number] | [number, number] }
type IdChatCodeType = 'map' | 'skill' | 'trait' | 'recipe' | 'skin' | 'outfit';
type IdChatCode = { type: IdChatCodeType, id: number }

function isItemChatCode(chatCode: ChatCode): chatCode is ItemChatCode {
  return chatCode.type === 'item';
}

function isIdChatCode(expected: IdChatCodeType): (chatCode: ChatCode) => chatCode is IdChatCode {
  // @ts-ignore
  return (chatCode) => chatCode.type === expected;
}

function splitSearchTerms(query: string): string[] {
  const terms = Array.from(query.matchAll(/"(?:\\\\.|[^\\\\"])+"|\S+/g)).map((term) => {
    return unpackQuotes(term[0])
      .replaceAll('\\\\', '\\')
      .replaceAll('\\"', '"')
      .replaceAll('%', '\\%');
  });

  return terms;
}

function unpackQuotes(value: string): string {
  if(value.at(0) === '"' && value.at(-1) === '"') {
    return value.substring(1, value.length - 1);
  }

  return value;
}

type LocalizedNameInput = {
  AND?: Prisma.Enumerable<LocalizedNameInput>;
  OR?: Prisma.Enumerable<LocalizedNameInput>;
  name_de?: Prisma.StringFilter | string;
  name_en?: Prisma.StringFilter | string;
  name_es?: Prisma.StringFilter | string;
  name_fr?: Prisma.StringFilter | string;
}

function nameQuery(terms: string[]): LocalizedNameInput[] {
  const nameQueries: LocalizedNameInput[] = ['de', 'en', 'es', 'fr'].map((lang) => ({
    AND: terms.map((term) => ({ [`name_${lang}`]: { contains: term, mode: 'insensitive' }}))
  }));

  return nameQueries;
}

const searchAchievements = remember(60, async function searchAchievements(terms: string[]) {
  const nameQueries = nameQuery(terms);

  const [achievements, achievementCategories, achievementGroups] = await Promise.all([
    db.achievement.findMany({
      where: terms.length > 0 ? { OR: nameQueries } : undefined,
      take: 5,
      include: { icon: true, achievementCategory: true }
    }),
    db.achievementCategory.findMany({
      where: terms.length > 0 ? { OR: nameQueries } : undefined,
      take: 5,
      include: { icon: true, achievementGroup: true }
    }),
    db.achievementGroup.findMany({
      where: terms.length > 0 ? { OR: nameQueries } : undefined,
      take: 5,
    }),
  ]);

  return { achievements, achievementCategories, achievementGroups };
});

const searchItems = remember(60, function searchItems(terms: string[], chatCodes: ChatCode[]) {
  const nameQueries = nameQuery(terms);
  const itemChatCodes = chatCodes.filter(isItemChatCode);
  const itemIdsInChatCodes = itemChatCodes.flatMap((chatCode) => [chatCode.id, ...(chatCode.upgrades || [])]);

  return db.item.findMany({
    where: { OR: [...nameQueries, { id: { in: itemIdsInChatCodes }}] },
    take: 5,
    include: { icon: true }
  });
});

const searchSkills = remember(60, function searchSkills(terms: string[], chatCodes: ChatCode[]) {
  const nameQueries = nameQuery(terms);
  const skillChatCodes = chatCodes.filter(isIdChatCode('skill'));
  const skillIdsInChatCodes = skillChatCodes.map(({ id }) => id);

  return db.skill.findMany({
    where: { OR: [...nameQueries, { id: { in: skillIdsInChatCodes }}] },
    take: 5,
    include: { icon: true }
  });
});

const searchSkins = remember(60, function searchSkins(terms: string[], chatCodes: ChatCode[]) {
  const nameQueries = nameQuery(terms);
  const itemChatCodes = chatCodes.filter(isItemChatCode);
  const skinChatCodes = chatCodes.filter(isIdChatCode('skin'));
  const skinIdsInChatcodes = [
    ...itemChatCodes.map(({ skin }) => skin).filter(isTruthy),
    ...skinChatCodes.map(({ id }) => id)
  ];

  return db.skin.findMany({
    where: { OR: [...nameQueries, { id: { in: skinIdsInChatcodes }}] },
    take: 5,
    include: { icon: true }
  });
});

const searchBuilds = remember(60, function searchBuilds(terms: string[]) {
  return db.build.findMany({
    where: { OR: terms.map((term) => ({ id: Number(term) })) },
    take: 5,
  });
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchValue = searchParams.get('q') ?? '';

  const terms = splitSearchTerms(searchValue);
  const chatCodes = terms.map(decode).filter(isTruthy);

  const [achievements, items, skills, skins, builds] = await Promise.all([
    searchAchievements(terms),
    searchItems(terms, chatCodes),
    searchSkills(terms, chatCodes),
    searchSkins(terms, chatCodes),
    searchBuilds(terms.filter((t) => t.toString() === Number(t).toString())),
  ]);

  return jsonResponse({ searchValue, terms, ...achievements, items, skills, skins, builds });
}

export type ApiSearchResponse = UnwrapJsonResponse<ReturnType<typeof GET>>;

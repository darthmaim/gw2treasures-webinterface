import type { Language } from '@gw2treasures/database';
import DetailLayout from '@/components/Layout/DetailLayout';
import { db } from '@/lib/prisma';
import type { Gw2Api } from 'gw2-api-types';
import { ItemList } from '@/components/ItemList/ItemList';
import { AchievementLink } from '@/components/Achievement/AchievementLink';
import { compareLocalizedName, localizedName } from '@/lib/localizedName';
import { Headline } from '@gw2treasures/ui/components/Headline/Headline';
import { Json } from '@/components/Format/Json';
import { Tip } from '@gw2treasures/ui/components/Tip/Tip';
import { notFound } from 'next/navigation';
import { Icon } from '@gw2treasures/ui';
import { RemovedFromApiNotice } from '@/components/Notice/RemovedFromApiNotice';
import type { Metadata } from 'next';
import { linkProperties } from '@/lib/linkProperties';
import { cache } from '@/lib/cache';
import { AchievementTable } from '@/components/Achievement/AchievementTable';
import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb/Breadcrumb';
import { getTranslate } from '@/lib/translate';
import type { PageProps } from '@/lib/next';

export type AchievementCategoryPageProps = PageProps<{ id: string }>;

const getAchievementCategory = cache(async (id: number, language: Language) => {
  const [achievementCategory, revision] = await Promise.all([
    db.achievementCategory.findUnique({
      where: { id },
      include: {
        icon: true,
        achievements: { include: { icon: true, rewardsItem: { select: linkProperties }, rewardsTitle: { select: { id: true, name_de: true, name_en: true, name_es: true, name_fr: true }}}},
        achievementGroup: true,
      }
    }),
    db.revision.findFirst({ where: { [`currentAchievementCategory_${language}`]: { id }}})
  ]);

  if(!achievementCategory || !revision) {
    notFound();
  }

  return { achievementCategory, revision };
}, ['achievement-category'], { revalidate: 60 });

async function AchievementCategoryPage({ params }: AchievementCategoryPageProps) {
  const { language, id } = await params;
  const achievementCategoryId = Number(id);

  if(isNaN(achievementCategoryId)) {
    notFound();
  }

  const { achievementCategory, revision } = await getAchievementCategory(achievementCategoryId, language);

  const data: Gw2Api.Achievement.Category = JSON.parse(revision.data);

  const achievements = achievementCategory.achievements.sort(compareLocalizedName(language));
  const [currentAchievements, historicAchievements] = achievements.reduce<[typeof achievements, typeof achievements]>(
    ([current, historic], achievement) => achievement.historic
      ? [current, [...historic, achievement]]
      : [[...current, achievement], historic],
    [[], []]
  );

  const t = getTranslate(language);

  return (
    <DetailLayout
      color={achievementCategory.icon?.color ?? undefined}
      title={data.name}
      icon={achievementCategory.icon}
      breadcrumb={(
        <Breadcrumb>
          <BreadcrumbItem href="/achievement" name={t('navigation.achievements')}/>
          {achievementCategory?.achievementGroup ? <BreadcrumbItem href={`/achievement#${achievementCategory.achievementGroup.id}`} name={localizedName(achievementCategory.achievementGroup, language)}/> : <BreadcrumbItem name="Unknown Group"/>}
        </Breadcrumb>
      )}
    >
      {achievementCategory.removedFromApi && (
        <RemovedFromApiNotice type="achievement category"/>
      )}

      {data.description && (
        <p>{data.description}</p>
      )}

      <AchievementTable
        language={language}
        achievements={currentAchievements}
        includeRewardsColumns
        headline="Achievements"
        headlineId="achievements"/>

      {historicAchievements.length > 0 && (
        <>
          <Headline id="historic">Historic <Tip tip={<p>Historic achievements have either been removed from the game or are part of a rotation.</p>}><Icon icon="info"/></Tip></Headline>
          <ItemList>
            {historicAchievements.map((achievement) => (
              <li key={achievement.id}><AchievementLink achievement={achievement}/></li>
            ))}
          </ItemList>
        </>
      )}

      <Headline id="data">Data</Headline>
      <Json data={data}/>

    </DetailLayout>
  );
}

export default AchievementCategoryPage;

export async function generateMetadata({ params }: AchievementCategoryPageProps): Promise<Metadata> {
  const { language, id: idParam } = await params;
  const id = Number(idParam);

  const achievementCategory = await db.achievementCategory.findUnique({
    where: { id },
    select: { name_de: true, name_en: true, name_es: true, name_fr: true }
  });

  if(!achievementCategory) {
    notFound();
  }

  return {
    title: localizedName(achievementCategory, language)
  };
}


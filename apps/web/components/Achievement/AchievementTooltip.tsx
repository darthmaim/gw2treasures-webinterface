import 'server-only';
import type { Gw2Api } from 'gw2-api-types';
import { ClientAchievementTooltip } from './AchievementTooltip.client';
import { getTranslate } from '@/lib/translate';
import type { Language } from '@gw2treasures/database';
import type { AsyncComponent } from '@/lib/asyncComponent';
import { format } from 'gw2-tooltip-html';

export interface AchievementTooltipProps {
  achievement: Gw2Api.Achievement;
  language: Language;
}

export const AchievementTooltip: AsyncComponent<AchievementTooltipProps> = async ({ achievement: achievement, language }) => {
  const tooltip = await createTooltip(achievement, language);

  return (
    <ClientAchievementTooltip tooltip={tooltip}/>
  );
};

export async function createTooltip(achievement: Gw2Api.Achievement, language: Language): Promise<AchievementTooltip> {
  const t = await getTranslate(language);

  return {
    language,
    description: format(achievement.description),
    requirement: format(achievement.requirement.replace('  ', ` ${achievement.tiers.at(-1)?.count ?? ''} `)),
    points: achievement.tiers?.reduce((total, { points }) => total + points, 0) ?? 0,
  };
}

export interface AchievementTooltip {
  language: Language,
  description: string,
  requirement: string,
  points: number,
}

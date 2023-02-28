import { FunctionComponent, ReactElement } from 'react';
import Link from 'next/link';
import { Language } from '@prisma/client';
import DetailLayout from '@/components/Layout/DetailLayout';
import { Table } from '@/components/Table/Table';
import { TableOfContentAnchor } from '@/components/TableOfContent/TableOfContent';
import { Gw2Api } from 'gw2-api-types';
import { Infobox } from '@/components/Infobox/Infobox';
import { Headline } from '@/components/Headline/Headline';
import { FormatDate } from '@/components/Format/FormatDate';
import { Json } from '@/components/Format/Json';
import { SkillIcon } from '@/components/Skill/SkillIcon';
import { SkillTooltip } from '@/components/Skill/SkillTooltip';
import { SkillInfobox } from '@/components/Skill/SkillInfobox';
import { getSkill } from './getSkill';
import { AsyncComponent } from '@/lib/asyncComponent';

export interface SkillPageComponentProps {
  language: Language;
  skillId: number;
  revisionId?: string;
}

export const SkillPageComponent: AsyncComponent<SkillPageComponentProps> = async ({ language, skillId, revisionId }) => {
  const fixedRevision = revisionId !== undefined;
  const { skill, revision } = await getSkill(skillId, language, revisionId);

  const data: Gw2Api.Skill = JSON.parse(revision.data);

  const breadcrumb = [
    'Skill',
    data.professions?.length === 1 && data.professions,
    data.attunement,
    (data.type !== 'Weapon' || !data.weapon_type) && data.type,
    data.weapon_type !== 'None' && data.weapon_type,
  ].filter(Boolean).join(' › ');

  return (
    <DetailLayout title={data.name} icon={skill.icon ? <SkillIcon icon={skill.icon}/> : undefined} breadcrumb={breadcrumb} infobox={<SkillInfobox skill={skill} data={data}/>}>
      {skill[`currentId_${language}`] !== revision.id && (
        <Infobox icon="revision">You are viewing an old revision of this skill (Build {revision.buildId || 'unknown'}). <Link href={`/skill/${skill.id}`}>View current.</Link></Infobox>
      )}
      {skill[`currentId_${language}`] === revision.id && fixedRevision && (
        <Infobox icon="revision">You are viewing this skill at a fixed revision (Build {revision.buildId || 'unknown'}). <Link href={`/skill/${skill.id}`}>View current.</Link></Infobox>
      )}
      {!fixedRevision && skill.removedFromApi && (
        <Infobox type="warning" icon="revision">This skill is currently not available in the Guild Wars 2 Api and you are seeing the last know version. The skill has either been removed from the game or needs to be rediscovered.</Infobox>
      )}

      <TableOfContentAnchor id="tooltip">Tooltip</TableOfContentAnchor>
      <SkillTooltip data={data}/>

      <Headline id="history">History</Headline>

      <Table>
        <thead>
          <tr><th {...{ width: 1 }}>Build</th><th {...{ width: 1 }}>Language</th><th>Description</th><th {...{ width: 1 }}>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {skill.history.map((history) => (
            <tr key={history.revisionId}>
              <td>{history.revisionId === revision.id ? <b>{history.revision.buildId || '-'}</b> : history.revision.buildId || '-'}</td>
              <td>{history.revision.language}</td>
              <td><Link href={`/skill/${skill.id}/${history.revisionId}`}>{history.revision.description}</Link></td>
              <td><FormatDate date={history.revision.createdAt} relative data-superjson/></td>
              <td>{revision.id !== history.revisionId && (<Link href={`/skill/diff/${history.revisionId}/${revision.id}`}>Compare</Link>)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Headline id="data">Data</Headline>
      <Json data={data}/>

    </DetailLayout>
  );
};

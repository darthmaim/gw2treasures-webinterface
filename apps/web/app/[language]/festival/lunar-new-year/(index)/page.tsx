import { Trans } from '@/components/I18n/Trans';
import { ItemTable } from '@/components/ItemTable/ItemTable';
import { ItemTableColumnsButton } from '@/components/ItemTable/ItemTableColumnsButton';
import { ItemTableContext } from '@/components/ItemTable/ItemTableContext';
import { PageLayout } from '@/components/Layout/PageLayout';
import { pageView } from '@/lib/pageView';
import { Headline } from '@gw2treasures/ui/components/Headline/Headline';
import type { Metadata } from 'next';
import { db } from '@/lib/prisma';
import { linkProperties, linkPropertiesWithoutRarity } from '@/lib/linkProperties';
import { cache } from '@/lib/cache';
import type { PageProps } from '@/lib/next';
import { getTranslate } from '@/lib/translate';
import { groupById } from '@gw2treasures/helper/group-by';
import { Dashboard } from 'app/[language]/dashboard/dashboard';
import { StructuredData } from '@/components/StructuredData/StructuredData';
import type { Event } from 'schema-dts';
import { absoluteUrl } from '@/lib/url';
import { Festival, getFestival } from '../../festivals';
import ogImage from '../og.png';

const ITEM_ENVELOPE = 68646;
const ITEM_DB_CHAMPION_ENVELOPE = 68647;
const ITEM_LITTLE_ENVELOPE = 68645;
const ITEM_TOKEN_CHAMPION = 92659;
const ITEM_TOKEN_CHAMPION_FRAGMENT = 94668;
const ITEM_TOKEN_DB_CHAMPION = 68618;

const itemIds = [
  ITEM_ENVELOPE,
  ITEM_DB_CHAMPION_ENVELOPE,
  ITEM_LITTLE_ENVELOPE,
  ITEM_TOKEN_CHAMPION,
  ITEM_TOKEN_CHAMPION_FRAGMENT,
  ITEM_TOKEN_DB_CHAMPION,
];

const loadData = cache(async function loadData() {
  const [items, coins] = await Promise.all([
    db.item.findMany({
      where: { id: { in: itemIds }},
      select: {
        ...linkProperties,
        tpTradeable: true, tpCheckedAt: true,
        buyPrice: true, buyQuantity: true,
        sellPrice: true, sellQuantity: true,
        tpHistory: { orderBy: { time: 'asc' }}
      },
      orderBy: { relevancy: 'desc' },
    }),
    db.currency.findFirst({
      where: { id: 1 },
      select: linkPropertiesWithoutRarity,
    }),
  ]);

  return { items, coins };
}, ['lunar-new-year-items'], { revalidate: 60 * 60 });

export default async function LunarNewYearPage({ params }: PageProps) {
  const { language } = await params;
  const t = getTranslate(language);
  const lunarNewYear = getFestival(Festival.LunarNewYear);

  const { items, coins } = await loadData();
  const itemsById = groupById(items);

  await pageView('festival/lunar-new-year');

  return (
    <PageLayout>
      <ItemTableContext id="lunar-new-year">
        <p><Trans id="festival.lunar-new-year.intro"/></p>
        <p><Trans id="festival.lunar-new-year.description"/></p>
        <Headline actions={<ItemTableColumnsButton/>} id="items"><Trans id="navigation.items"/></Headline>
        <ItemTable query={{ where: { id: { in: itemIds }}}} defaultColumns={['item', 'rarity', 'type', 'buyPrice', 'buyPriceTrend', 'sellPrice', 'sellPriceTrend']}/>
      </ItemTableContext>

      <div style={{ marginTop: 32 }}/>

      <Headline id="inventory">Inventory</Headline>
      {/* <InventoryTable envelope={itemsById.get(ITEM_ENVELOPE)!}/> */}
      <Dashboard initialColumns={[{ type: 'currency', id: 1, currency: coins! }, { type: 'item', id: ITEM_ENVELOPE, item: itemsById.get(ITEM_ENVELOPE) }]} embedded/>

      {lunarNewYear && (
        <StructuredData data={{
          '@type': 'Event',
          name: t('festival.lunar-new-year'),
          description: t('festival.lunar-new-year.description'),
          location: {
            '@type': 'VirtualLocation',
            url: (await absoluteUrl('/festival/lunar-new-year')).toString()
          },
          startDate: lunarNewYear.startsAt.toISOString(),
          endDate: lunarNewYear.endsAt.toISOString(),
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          image: [(await absoluteUrl(ogImage.src)).toString()]
        } satisfies Event}/>
      )}
    </PageLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language } = await params;
  const t = getTranslate(language);

  return {
    title: {
      absolute: `${t('festival.lunar-new-year')} · gw2treasures.com`
    }
  };
}

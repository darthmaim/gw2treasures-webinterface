import { cloneElement, type CSSProperties, type FC, isValidElement, type ReactElement, type ReactNode } from 'react';
import styles from './DetailLayout.module.css';
import { TableOfContentContext, TableOfContent } from '@gw2treasures/ui/components/TableOfContent/TableOfContent';
import type { Icon } from '@gw2treasures/database';
import { EntityIcon, type EntityIconType } from '../Entity/EntityIcon';
import { Button } from '@gw2treasures/ui/components/Form/Button';
import { Icon as IconComponent } from '@gw2treasures/ui';
import { DropDown } from '@gw2treasures/ui/components/DropDown/DropDown';
import { MenuList } from '@gw2treasures/ui/components/Layout/MenuList';
import { getLanguage, getTranslate } from '@/lib/translate';

interface DetailLayoutProps {
  title: ReactNode;
  icon?: Icon | ReactElement<{ className: string }> | null;
  iconType?: EntityIconType;
  breadcrumb?: ReactNode;
  children: ReactNode;
  infobox?: ReactNode;
  className?: string;
  actions?: ReactNode[];
  color?: CSSProperties['--hero-color'];
}

const DetailLayout: FC<DetailLayoutProps> = async ({ title, icon, breadcrumb, children, infobox, className, iconType, actions, color }) => {
  const language = await getLanguage();
  const t = getTranslate(language);

  return (
    <TableOfContentContext>
      <main className={[styles.main, className].filter(Boolean).join(' ')} style={color ? { '--hero-color': color } : undefined}>
        <div className={infobox ? styles.headline : styles.headlineWithoutInfobox}>
          {icon && typeof icon === 'object' && (isValidElement(icon) ? cloneElement(icon, { className: styles.icon }) : <EntityIcon icon={icon} size={48} className={styles.icon} type={iconType}/>)}
          <h1 className={styles.title}>{title}</h1>
          {breadcrumb && <div className={styles.breadcrumb}>{breadcrumb}</div>}
          {actions && (
            <div className={styles.actions}>
              <DropDown button={<Button iconOnly appearance="menu" aria-label={t('actions')}><IconComponent icon="more"/></Button>}>
                <MenuList>{actions}</MenuList>
              </DropDown>
            </div>
          )}
        </div>
        <aside className={styles.tableOfContent}>
          <TableOfContent/>
        </aside>
        {infobox && (
          <aside className={styles.infobox}>
            {infobox}
          </aside>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </TableOfContentContext>
  );
};

export default DetailLayout;

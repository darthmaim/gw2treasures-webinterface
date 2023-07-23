'use client';

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { context } from './context';
import { ItemTableProps } from './ItemTable.client';
import { GlobalColumnId } from './columns';

interface ItemTableContextProps {
  children: ReactNode;
  id: string;
  global?: boolean;
};

const emptyAvailableColumns = {} as ItemTableProps['availableColumns'];

export const ItemTableContext: FC<ItemTableContextProps> = ({ children, id, global: isGlobalContext = false }) => {
  const [availableColumns, setAvailableColumns] = useState<ItemTableProps['availableColumns']>(emptyAvailableColumns);
  const [defaultColumns, setDefaultColumns] = useState<GlobalColumnId[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<GlobalColumnId[]>();

  // store selected columns in localStorage if this is not the global context and available columns are set
  const localStorageKey = !isGlobalContext && availableColumns !== emptyAvailableColumns
    ? `gw2t.itemTable.columns.${id}`
    : undefined;

  // load selected columns from localStorage
  useEffect(() => {
    if(!localStorageKey) {
      return;
    }

    try {
      const columns = JSON.parse(localStorage.getItem(localStorageKey) ?? 'false');

      if(Array.isArray(columns) && columns.every((column) => column in availableColumns)) {
        setSelectedColumns(columns);
      }
    } catch {}
  }, [availableColumns, localStorageKey]);

  // store selected columns in localStorage
  useEffect(() => {
    if(!localStorageKey) {
      return;
    }

    if(selectedColumns) {
      localStorage.setItem(localStorageKey, JSON.stringify(selectedColumns));
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }, [localStorageKey, selectedColumns]);

  const value = useMemo(() => ({
    availableColumns, setAvailableColumns,
    defaultColumns, setDefaultColumns,
    selectedColumns, setSelectedColumns,
    isGlobalContext,
  }), [availableColumns, defaultColumns, selectedColumns, isGlobalContext]);

  return (
    <context.Provider value={value}>{children}</context.Provider>
  );
};

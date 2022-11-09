import { useCallback, useEffect, useState } from 'react';

export function useFetch(url: string, callback: (response: Response) => any) {
  const [_, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(callback)
      .catch((error) => error.name !== 'AbortError' && setError(() => { throw error; }));

    return () => controller.abort();
  }, [url, callback]);
}

type UseJsonFetchResult<T> = { loading: true } | { loading: false, data: T }

export function useJsonFetch<T = unknown>(url: string): UseJsonFetchResult<T> {
  const [data, setData] = useState<UseJsonFetchResult<T>>({ loading: true });

  useFetch(url, useCallback((response) => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    response.json().then((data: T) => setData({ loading: false, data }));
  }, []));

  useEffect(() => {
    setData({ loading: true });
  }, [url]);

  return data;
}

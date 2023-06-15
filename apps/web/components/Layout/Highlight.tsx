import 'server-only';
import { FC, Suspense } from 'react';

// @ts-expect-error
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { createStarryNight, common } from '@wooorm/starry-night';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import '@wooorm/starry-night/style/both.css';

interface HighlightProps {
  code: string;
  language: string;
};

export const Highlight: FC<HighlightProps> = ({ code, language }) => {
  return (
    <Suspense fallback={code}>
      <HighlightAsync code={code} language={language}/>
    </Suspense>
  );
};

const HighlightAsync: FC<HighlightProps> = async ({ code, language }) => {
  const starryNight = await createStarryNight(common);

  const scope = starryNight.flagToScope(language);

  if(!scope) {
    return (<>{code}</>);
  }

  const tree = starryNight.highlight(code, scope);
  const reactNode = toJsxRuntime(tree, { Fragment, jsx, jsxs });

  return reactNode;
};


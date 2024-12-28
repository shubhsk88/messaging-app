'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'jotai';

export const JotaiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

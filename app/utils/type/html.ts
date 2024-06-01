export type Metadata = Partial<{
  keywords: Array<string>;
  description: string;
  author: string;
  viewport: string;
  title: string;
  icon: string;
  enableScroll?: boolean;
  prefetches?: JSX.Element[];
  cookie: Record<string, any>;
}>;

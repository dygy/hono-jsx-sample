export type Metadata = Partial<{
  keywords: Array<string>;
  description: string;
  author: string;
  viewport: string;
  title: string;
  icon: string;
  cookie: Record<string, any>;
}>;

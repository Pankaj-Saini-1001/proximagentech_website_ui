export type ThemeMode = 'light' | 'dark';

export type BrandColor = 'green' | 'purple' | 'dark' | 'white';

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

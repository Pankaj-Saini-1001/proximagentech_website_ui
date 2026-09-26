export function generateMetaTitle(pageTitle?: string): string {
  const brand = 'ProximaGenTech';
  if (!pageTitle) {
    return `${brand} | Sustainable Digital Solutions & AI Technology`;
  }
  return `${pageTitle} | ${brand}`;
}

export function truncateDescription(desc: string, maxLen = 160): string {
  if (desc.length <= maxLen) return desc;
  return desc.substring(0, maxLen - 3) + '...';
}

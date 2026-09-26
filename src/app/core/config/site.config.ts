import { GREEN_INNOVATION_THEME, THEME_CONFIG, TYPOGRAPHY_CONFIG } from './theme.config';

export { GREEN_INNOVATION_THEME, THEME_CONFIG, TYPOGRAPHY_CONFIG };

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const SITE_CONFIG = {
  name: 'Proxima Gen Tech',
  legalName: 'Proxima Gen Tech Private Limited',
  tagline: 'Sustainable Digital Solutions',
  headline: 'Engineering scalable software for a smarter digital future.',
  subheadline:
    'We design and build scalable software products, enterprise applications and AI-powered solutions that help businesses operate smarter, move faster and grow with confidence.',
  colors: THEME_CONFIG,
  typography: TYPOGRAPHY_CONFIG,
  contact: {
    address: 'Sector-77, Noida, 201301, Uttar Pradesh, India',
    phone: '+91 9818963343',
    phoneFormatted: '+91 98189 63343',
    email: 'info@proximagentech.com',
  },
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'About', href: '#about' },
  ] as NavItem[],
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  ],
};

export const site = {
  name: 'Farih Muwaffaq',
  email: 'farihmuwaffaq@gmail.com',
  location: 'Jakarta, Indonesia',
  description: 'Portfolio of Farih Muwaffaq, a Jakarta-based Data Analyst building analytics systems, automated reporting, dashboards, and commercial insights across FMCG, healthcare, and marketing.',
};

export const social: Array<[label: string, href: string, icon: 'logo-linkedin' | 'logo-github']> = [
  ['LinkedIn', 'https://www.linkedin.com/in/farihmuwaffaq/', 'logo-linkedin'],
  ['GitHub', 'https://github.com/farihmuwaffaq', 'logo-github'],
];

export const nav = [
  ['Home', '/'], ['Work', '/work'], ['About', '/about'], ['Resume', '/resume'], ['Contact', '/contact'],
] as const;

import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Home } from './modules/home/home';
import { Service } from './modules/service/service';
import { AboutUs } from './modules/about-us/about-us';
import { ContactUs } from './modules/contact-us/contact-us';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Home,
        title: 'ProximaGenTech - Sustainable Solutions',
      },
      {
        path: 'services',
        component: Service,
        title: 'Services - ProximaGenTech',
      },
      {
        path: 'service',
        redirectTo: 'services',
        pathMatch: 'full',
      },
      {
        path: 'about-us',
        component: AboutUs,
        title: 'About Us - ProximaGenTech',
      },
      {
        path: 'about',
        redirectTo: 'about-us',
        pathMatch: 'full',
      },
      {
        path: 'contact-us',
        component: ContactUs,
        title: 'Contact Us - ProximaGenTech',
      },
      {
        path: 'contact',
        redirectTo: 'contact-us',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

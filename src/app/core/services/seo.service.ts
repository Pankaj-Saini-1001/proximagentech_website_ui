import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private readonly defaultTitle = 'ProximaGenTech | Sustainable Digital Solutions & AI Technology';
  private readonly defaultDescription =
    'Building scalable software, AI-powered solutions, and digital experiences that help businesses grow sustainably.';

  public update(data: SeoData = {}): void {
    const title = data.title ? `${data.title} | ProximaGenTech` : this.defaultTitle;
    const description = data.description || this.defaultDescription;

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });

    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    if (data.url) this.metaService.updateTag({ property: 'og:url', content: data.url });
    if (data.image) this.metaService.updateTag({ property: 'og:image', content: data.image });
    this.metaService.updateTag({ property: 'og:type', content: data.type || 'website' });

    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    if (data.image) this.metaService.updateTag({ name: 'twitter:image', content: data.image });
  }
}

import { SeoConfiguration } from '../data/interfaces/seo-configuration';

export class SeoService {
  private seoConfigurations: SeoConfiguration[] = [];

  getAllSeoConfigurations(): SeoConfiguration[] {
    return this.seoConfigurations;
  }

  getSeoConfigurationById(id: number): SeoConfiguration | undefined {
    return this.seoConfigurations[id]; // Supongamos que 'id' es el índice del array
  }

  createSeoConfiguration(config: SeoConfiguration): SeoConfiguration {
    this.seoConfigurations.push(config);
    return config;
  }

  updateSeoConfiguration(id: number, config: SeoConfiguration): SeoConfiguration | undefined {
    const existingConfig = this.getSeoConfigurationById(id);
    if (existingConfig) {
      this.seoConfigurations[id] = config;
      return config;
    }
    return undefined;
  }

  deleteSeoConfiguration(id: number): boolean {
    const configExists = this.getSeoConfigurationById(id);
    if (configExists) {
      this.seoConfigurations.splice(id, 1);
      return true;
    }
    return false;
  }
}
import {
  LocalizedText,
  SpaceProfileCategoryConfig,
  SpaceSupportedSocial,
} from '@api/space/SpaceApi';

export const SpaceProfileCategoryUtil = {
  getLocalizedCategoryLabel: (
    config: SpaceProfileCategoryConfig,
    language: string
  ): string | undefined => {
    return getLocalizedText(
      config.localizedCategoryLabels,
      language,
      config.defaultLanguage
    );
  },

  getLocalizedCategoryName: (
    config: SpaceProfileCategoryConfig,
    categoryId: string,
    language: string
  ): string | undefined => {
    const categoryItem = config.categoryItems.find(
      (categoryItem) => categoryItem.id === categoryId
    );
    if (!categoryItem) return undefined;

    return getLocalizedText(
      categoryItem?.localizedNames,
      language,
      config.defaultLanguage
    );
  },

  getLocalizedCategoryNames: (
    config: SpaceProfileCategoryConfig,
    language: string
  ): string[] => {
    return config.categoryItems.map((categoryItem) => {
      return (
        getLocalizedText(
          categoryItem.localizedNames,
          language,
          config.defaultLanguage
        ) || ''
      );
    });
  },

  getCategoryColor: (
    config: SpaceProfileCategoryConfig,
    categoryId: string
  ): string | undefined => {
    return config.categoryItems.find(
      (categoryItem) => categoryItem.id === categoryId
    )?.color;
  },
};

export function getLocalizedText(
  localizedTexts: LocalizedText[],
  language: string,
  defaultLanguage: string
): string | undefined {
  return (
    localizedTexts?.find(({ language: lang }) => lang == language)?.text ||
    localizedTexts?.find(({ language }) => language == defaultLanguage)?.text
  );
}

export const SpaceSocialUtil = {
  getSocialLabel: (social: SpaceSupportedSocial): string => {
    switch (social) {
      case 'LINKEDIN':
        return 'LinkedIn';
      case 'INSTAGRAM':
        return 'Instagram';
      case 'TWITTER':
        return 'Twitter';
    }
  },
  getSocialFromLabel: (label: string): SpaceSupportedSocial | undefined => {
    switch (label) {
      case 'LinkedIn':
        return 'LINKEDIN';
      case 'Instagram':
        return 'INSTAGRAM';
      case 'Twitter':
        return 'TWITTER';
    }
  },
  getSocialIconId: (social: SpaceSupportedSocial): string => {
    switch (social) {
      case 'LINKEDIN':
        return 'logos:linkedin-icon';
      case 'INSTAGRAM':
        return 'skill-icons:instagram';
      case 'TWITTER':
        return 'logos:twitter';
    }
  },
  createSocialUrl: (social: SpaceSupportedSocial, username: string): string => {
    switch (social) {
      case 'LINKEDIN':
        return `https://www.linkedin.com/in/${username}`;
      case 'INSTAGRAM':
        return `https://www.instagram.com/${username}`;
      case 'TWITTER':
        return `https://twitter.com/${username}`;
    }
  },
  extractUsernameFromUrl: (
    social: SpaceSupportedSocial,
    url: string
  ): string | undefined => {
    switch (social) {
      case 'LINKEDIN':
      case 'INSTAGRAM':
      case 'TWITTER':
        return url
          .split('/')
          .filter((item) => item)
          .pop();
    }
  },
  extractUsernameFromText: (
    social: SpaceSupportedSocial,
    text: string
  ): string | undefined => {
    if (text.startsWith('https://') || text.startsWith('http://')) {
      return SpaceSocialUtil.extractUsernameFromUrl(social, text);
    } else {
      return text;
    }
  },
};

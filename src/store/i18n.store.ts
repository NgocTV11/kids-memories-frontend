import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Locale, defaultLocale } from '@/config/i18n.config';
import { getTranslation } from '@/locales/common';
import { getDashboardTranslation } from '@/locales/dashboard';
import { getKidsTranslation } from '@/locales/kids';
import { getAlbumsTranslation } from '@/locales/albums';
import { getFamiliesTranslation } from '@/locales/families';
import { getMilestonesTranslation } from '@/locales/milestones';
import { getPhotosTranslation } from '@/locales/photos';
import { getAuthTranslation } from '@/locales/auth';
import { getAdminTranslation } from '@/locales/admin';
import { getProfileTranslation } from '@/locales/profile';
import { getLandingTranslation } from '@/locales/landing';

interface I18nState {
  locale: Locale;
  t: ReturnType<typeof getTranslation>;
  dashboard: ReturnType<typeof getDashboardTranslation>;
  kids: ReturnType<typeof getKidsTranslation>;
  albums: ReturnType<typeof getAlbumsTranslation>;
  families: ReturnType<typeof getFamiliesTranslation>;
  milestones: ReturnType<typeof getMilestonesTranslation>;
  photos: ReturnType<typeof getPhotosTranslation>;
  auth: ReturnType<typeof getAuthTranslation>;
  admin: ReturnType<typeof getAdminTranslation>;
  profile: ReturnType<typeof getProfileTranslation>;
  landing: ReturnType<typeof getLandingTranslation>;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      t: getTranslation(defaultLocale),
      dashboard: getDashboardTranslation(defaultLocale),
      kids: getKidsTranslation(defaultLocale),
      albums: getAlbumsTranslation(defaultLocale),
      families: getFamiliesTranslation(defaultLocale),
      milestones: getMilestonesTranslation(defaultLocale),
      photos: getPhotosTranslation(defaultLocale),
      auth: getAuthTranslation(defaultLocale),
      admin: getAdminTranslation(defaultLocale),
      profile: getProfileTranslation(defaultLocale),
      landing: getLandingTranslation(defaultLocale),
      setLocale: (locale: Locale) => {
        set({
          locale,
          t: getTranslation(locale),
          dashboard: getDashboardTranslation(locale),
          kids: getKidsTranslation(locale),
          albums: getAlbumsTranslation(locale),
          families: getFamiliesTranslation(locale),
          milestones: getMilestonesTranslation(locale),
          photos: getPhotosTranslation(locale),
          auth: getAuthTranslation(locale),
          admin: getAdminTranslation(locale),
          profile: getProfileTranslation(locale),
          landing: getLandingTranslation(locale),
        });
      },
    }),
    {
      name: 'i18n-storage',
      version: 5, // Increment version to force reload with slider translations
      migrate: (persistedState: any, version: number) => {
        // If old version, reset to defaults
        if (version < 5) {
          const locale = persistedState?.locale || defaultLocale;
          return {
            locale,
            t: getTranslation(locale),
            dashboard: getDashboardTranslation(locale),
            kids: getKidsTranslation(locale),
            albums: getAlbumsTranslation(locale),
            families: getFamiliesTranslation(locale),
            milestones: getMilestonesTranslation(locale),
            photos: getPhotosTranslation(locale),
            auth: getAuthTranslation(locale),
            admin: getAdminTranslation(locale),
            profile: getProfileTranslation(locale),
            landing: getLandingTranslation(locale),
          };
        }
        return persistedState;
      },
    }
  )
);

export type OfferSettings = {
  label: string;
  title: string;
  subtitle: string;
  isActive: boolean;
};

export const defaultOfferSettings: OfferSettings = {
  label: "Limited Offer",
  title: "Up To 40% OFF 🔥",
  subtitle: "Premium Football Jerseys",
  isActive: true,
};

export const normalizeOfferSettings = (value: unknown): OfferSettings => {
  if (!value || typeof value !== "object") {
    return defaultOfferSettings;
  }

  const settings = value as Partial<OfferSettings>;

  return {
    label: String(settings.label || defaultOfferSettings.label),
    title: String(settings.title || defaultOfferSettings.title),
    subtitle: String(settings.subtitle || defaultOfferSettings.subtitle),
    isActive:
      typeof settings.isActive === "boolean"
        ? settings.isActive
        : defaultOfferSettings.isActive,
  };
};

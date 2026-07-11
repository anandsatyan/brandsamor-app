/** Confirmed contact channels for conversion CTAs. */
export const WHATSAPP_GCC = {
  e164: '+971521543617',
  display: '+971 52 154 3617',
  /** Digits only for wa.me links */
  waMe: '971521543617',
} as const;

export const whatsappHref = (prefill?: string) => {
  const base = `https://wa.me/${WHATSAPP_GCC.waMe}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
};

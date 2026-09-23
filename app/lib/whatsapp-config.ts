/**
 * Filas de grupos WhatsApp.
 * Cada item recebe `maxClicks` antes de passar para o próximo.
 * Depois do último, continua no último grupo.
 */
export const WHATSAPP_GROUPS = [
  {
    url: "https://chat.whatsapp.com/IvudTWrc6Uz09OBCZR1SGT",
    maxClicks: 253,
  },
  {
    url: "https://chat.whatsapp.com/HCUO7AfGW1x05XHk2fTi1Z",
    maxClicks: 205,
  },
  {
    url: "https://chat.whatsapp.com/HqiL10jphxZGZL2FoJeYKn",
    maxClicks: 195,
  },
  {
    url: "https://chat.whatsapp.com/GgiaeKuxGMB5uSZakNWG2y",
    maxClicks: 299,
  },
  {
    url: "https://chat.whatsapp.com/Jf3qIlV78zx33GjHMxMsSU",
    maxClicks: 416,
  },
] as const satisfies ReadonlyArray<{ url: string; maxClicks: number }>;

export const WHATSAPP_URL_FALLBACK: string = WHATSAPP_GROUPS[0].url;

export const WA_URL_STORAGE_KEY = "wa_redirect_url";

export function resolveWhatsAppUrl(clickCount: number) {
  const safeCount = Math.max(1, Math.floor(clickCount));
  let upperBound = 0;

  for (let i = 0; i < WHATSAPP_GROUPS.length; i += 1) {
    const group = WHATSAPP_GROUPS[i];
    upperBound += group.maxClicks;
    const isLast = i === WHATSAPP_GROUPS.length - 1;

    if (safeCount <= upperBound || isLast) {
      return {
        url: group.url,
        group: i + 1,
        maxClicks: group.maxClicks,
        untilClick: isLast ? null : upperBound,
      };
    }
  }

  const last = WHATSAPP_GROUPS[WHATSAPP_GROUPS.length - 1];
  return {
    url: last.url,
    group: WHATSAPP_GROUPS.length,
    maxClicks: last.maxClicks,
    untilClick: null,
  };
}

import { describe, expect, it } from "vitest";
import {
  WHATSAPP_GROUPS,
  resolveWhatsAppUrl,
} from "./whatsapp-config";

const bounds = WHATSAPP_GROUPS.reduce<number[]>((acc, group) => {
  const prev = acc.length ? acc[acc.length - 1] : 0;
  acc.push(prev + group.maxClicks);
  return acc;
}, []);

describe("resolveWhatsAppUrl", () => {
  it("usa o grupo 1 no primeiro clique", () => {
    const result = resolveWhatsAppUrl(1);
    expect(result.group).toBe(1);
    expect(result.url).toBe(WHATSAPP_GROUPS[0].url);
  });

  it("mantém o grupo 1 até o limite de 138", () => {
    expect(resolveWhatsAppUrl(138).group).toBe(1);
    expect(resolveWhatsAppUrl(138).url).toBe(WHATSAPP_GROUPS[0].url);
  });

  it("troca para o grupo 2 no clique 139", () => {
    const result = resolveWhatsAppUrl(139);
    expect(result.group).toBe(2);
    expect(result.url).toBe(WHATSAPP_GROUPS[1].url);
  });

  it("respeita todos os limites de troca entre grupos", () => {
    const cases = [
      { click: 1, group: 1 },
      { click: 138, group: 1 },
      { click: 139, group: 2 },
      { click: 315, group: 2 },
      { click: 316, group: 3 },
      { click: 503, group: 3 },
      { click: 504, group: 4 },
      { click: 945, group: 4 },
      { click: 946, group: 5 },
      { click: 1256, group: 5 },
      { click: 1257, group: 6 },
      { click: 1561, group: 6 },
      { click: 1562, group: 7 },
      { click: 1908, group: 7 },
      { click: 5000, group: 7 },
    ];

    for (const item of cases) {
      const result = resolveWhatsAppUrl(item.click);
      expect(result.group, `click ${item.click}`).toBe(item.group);
      expect(result.url, `click ${item.click}`).toBe(
        WHATSAPP_GROUPS[item.group - 1].url,
      );
    }
  });

  it("normaliza valores inválidos para o grupo 1", () => {
    expect(resolveWhatsAppUrl(0).group).toBe(1);
    expect(resolveWhatsAppUrl(-10).group).toBe(1);
    expect(resolveWhatsAppUrl(1.9).group).toBe(1);
  });

  it("soma total dos limites bate com a configuração", () => {
    const total = WHATSAPP_GROUPS.reduce((sum, g) => sum + g.maxClicks, 0);
    expect(total).toBe(138 + 177 + 188 + 442 + 311 + 305 + 347);
    expect(bounds).toEqual([138, 315, 503, 945, 1256, 1561, 1908]);
  });

  it("expõe untilClick correto fora do último grupo", () => {
    expect(resolveWhatsAppUrl(10).untilClick).toBe(138);
    expect(resolveWhatsAppUrl(200).untilClick).toBe(315);
    expect(resolveWhatsAppUrl(1600).untilClick).toBeNull();
  });
});

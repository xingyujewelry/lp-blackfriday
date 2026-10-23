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

  it("mantém o grupo 1 até o limite de 143", () => {
    expect(resolveWhatsAppUrl(143).group).toBe(1);
    expect(resolveWhatsAppUrl(143).url).toBe(WHATSAPP_GROUPS[0].url);
  });

  it("troca para o grupo 2 no clique 144", () => {
    const result = resolveWhatsAppUrl(144);
    expect(result.group).toBe(2);
    expect(result.url).toBe(WHATSAPP_GROUPS[1].url);
  });

  it("respeita todos os limites de troca entre grupos", () => {
    const cases = [
      { click: 1, group: 1 },
      { click: 143, group: 1 },
      { click: 144, group: 2 },
      { click: 354, group: 2 },
      { click: 355, group: 3 },
      { click: 471, group: 3 },
      { click: 472, group: 4 },
      { click: 880, group: 4 },
      { click: 881, group: 5 },
      { click: 1124, group: 5 },
      { click: 1125, group: 6 },
      { click: 1327, group: 6 },
      { click: 1328, group: 7 },
      { click: 1597, group: 7 },
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
    expect(total).toBe(143 + 211 + 117 + 409 + 244 + 203 + 270);
    expect(bounds).toEqual([143, 354, 471, 880, 1124, 1327, 1597]);
  });

  it("expõe untilClick correto fora do último grupo", () => {
    expect(resolveWhatsAppUrl(10).untilClick).toBe(143);
    expect(resolveWhatsAppUrl(200).untilClick).toBe(354);
    expect(resolveWhatsAppUrl(1400).untilClick).toBeNull();
  });
});

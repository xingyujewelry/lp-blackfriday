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

  it("mantém o grupo 1 até o limite de 253", () => {
    expect(resolveWhatsAppUrl(253).group).toBe(1);
    expect(resolveWhatsAppUrl(253).url).toBe(WHATSAPP_GROUPS[0].url);
  });

  it("troca para o grupo 2 no clique 254", () => {
    const result = resolveWhatsAppUrl(254);
    expect(result.group).toBe(2);
    expect(result.url).toBe(WHATSAPP_GROUPS[1].url);
  });

  it("respeita todos os limites de troca entre grupos", () => {
    const cases = [
      { click: 1, group: 1 },
      { click: 253, group: 1 },
      { click: 254, group: 2 },
      { click: 458, group: 2 },
      { click: 459, group: 3 },
      { click: 653, group: 3 },
      { click: 654, group: 4 },
      { click: 952, group: 4 },
      { click: 953, group: 5 },
      { click: 1368, group: 5 },
      { click: 5000, group: 5 },
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
    expect(total).toBe(253 + 205 + 195 + 299 + 416);
    expect(bounds).toEqual([253, 458, 653, 952, 1368]);
  });

  it("expõe untilClick correto fora do último grupo", () => {
    expect(resolveWhatsAppUrl(10).untilClick).toBe(253);
    expect(resolveWhatsAppUrl(300).untilClick).toBe(458);
    expect(resolveWhatsAppUrl(1000).untilClick).toBeNull();
  });
});

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import {
  getClickState,
  incrementClickAndGetWhatsApp,
  resetClickStore,
} from "./click-store";
import { WHATSAPP_GROUPS } from "./whatsapp-config";

describe("click-store", () => {
  let tempFile = "";

  beforeEach(async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "wa-clicks-"));
    tempFile = path.join(dir, "clicks.json");
  });

  afterEach(async () => {
    try {
      await fs.rm(path.dirname(tempFile), { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  });

  it("começa em 0 quando o arquivo não existe", async () => {
    const state = await getClickState(tempFile);
    expect(state.count).toBe(0);
    expect(state.group).toBe(1);
    expect(state.url).toBe(WHATSAPP_GROUPS[0].url);
  });

  it("incrementa e persiste o contador", async () => {
    const first = await incrementClickAndGetWhatsApp(tempFile);
    const second = await incrementClickAndGetWhatsApp(tempFile);
    const saved = JSON.parse(await fs.readFile(tempFile, "utf8")) as {
      count: number;
    };

    expect(first.count).toBe(1);
    expect(second.count).toBe(2);
    expect(saved.count).toBe(2);
  });

  it("recupera o estado salvo do disco", async () => {
    await resetClickStore(252, tempFile);
    const before = await getClickState(tempFile);
    expect(before.count).toBe(252);
    expect(before.group).toBe(1);

    const next = await incrementClickAndGetWhatsApp(tempFile);
    expect(next.count).toBe(253);
    expect(next.group).toBe(1);

    const switched = await incrementClickAndGetWhatsApp(tempFile);
    expect(switched.count).toBe(254);
    expect(switched.group).toBe(2);
    expect(switched.url).toBe(WHATSAPP_GROUPS[1].url);
  });

  it("troca para o grupo 5 após 952 cliques", async () => {
    await resetClickStore(952, tempFile);
    const next = await incrementClickAndGetWhatsApp(tempFile);
    expect(next.count).toBe(953);
    expect(next.group).toBe(5);
    expect(next.url).toBe(WHATSAPP_GROUPS[4].url);
  });

  it("trata JSON inválido como contador zerado", async () => {
    await fs.mkdir(path.dirname(tempFile), { recursive: true });
    await fs.writeFile(tempFile, "{not-json", "utf8");

    const state = await getClickState(tempFile);
    expect(state.count).toBe(0);

    const next = await incrementClickAndGetWhatsApp(tempFile);
    expect(next.count).toBe(1);
    expect(next.group).toBe(1);
  });

  it("trata count inválido no JSON como zero", async () => {
    await fs.mkdir(path.dirname(tempFile), { recursive: true });
    await fs.writeFile(tempFile, JSON.stringify({ count: "abc" }), "utf8");

    const state = await getClickState(tempFile);
    expect(state.count).toBe(0);
  });
});

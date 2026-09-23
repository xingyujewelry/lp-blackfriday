import { beforeEach, describe, expect, it } from "vitest";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { POST, GET } from "../api/click/route";
import { WHATSAPP_GROUPS } from "./whatsapp-config";

describe("POST /api/click", () => {
  beforeEach(async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "wa-api-"));
    process.env.CLICK_STORE_PATH = path.join(dir, "clicks.json");
  });

  it("registra clique e devolve url do grupo 1", async () => {
    const res = await POST();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.count).toBe(1);
    expect(body.group).toBe(1);
    expect(body.url).toBe(WHATSAPP_GROUPS[0].url);
  });

  it("incrementa em chamadas sequenciais e troca no limite", async () => {
    await fs.writeFile(
      process.env.CLICK_STORE_PATH!,
      JSON.stringify({ count: 253 }),
      "utf8",
    );

    const res = await POST();
    const body = await res.json();

    expect(body.count).toBe(254);
    expect(body.group).toBe(2);
    expect(body.url).toBe(WHATSAPP_GROUPS[1].url);
  });

  it("GET retorna o estado atual sem incrementar", async () => {
    await fs.writeFile(
      process.env.CLICK_STORE_PATH!,
      JSON.stringify({ count: 10 }),
      "utf8",
    );

    const first = await GET();
    const second = await GET();
    const a = await first.json();
    const b = await second.json();

    expect(a.count).toBe(10);
    expect(b.count).toBe(10);
    expect(a.group).toBe(1);
  });
});

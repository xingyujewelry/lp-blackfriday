import { promises as fs } from "fs";
import path from "path";
import { resolveWhatsAppUrl } from "./whatsapp-config";

type ClickState = {
  count: number;
};

function getDataFile() {
  return (
    process.env.CLICK_STORE_PATH ??
    path.join(process.cwd(), "data", "clicks.json")
  );
}

async function ensureStore(filePath = getDataFile()): Promise<ClickState> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as ClickState;
    if (typeof parsed.count !== "number" || Number.isNaN(parsed.count)) {
      return { count: 0 };
    }
    return { count: Math.max(0, Math.floor(parsed.count)) };
  } catch {
    return { count: 0 };
  }
}

async function writeStore(state: ClickState, filePath = getDataFile()) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(state, null, 2), "utf8");
}

export async function resetClickStore(
  count = 0,
  filePath = getDataFile(),
) {
  await writeStore({ count: Math.max(0, Math.floor(count)) }, filePath);
}

export async function incrementClickAndGetWhatsApp(
  filePath = getDataFile(),
) {
  const state = await ensureStore(filePath);
  state.count += 1;
  await writeStore(state, filePath);

  const resolved = resolveWhatsAppUrl(state.count);
  return {
    count: state.count,
    ...resolved,
  };
}

export async function getClickState(filePath = getDataFile()) {
  const state = await ensureStore(filePath);
  const resolved = resolveWhatsAppUrl(Math.max(1, state.count));
  return {
    count: state.count,
    ...resolved,
  };
}

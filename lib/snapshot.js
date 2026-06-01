import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getOpsSnapshot() {
  const snapshotPath = path.join(process.cwd(), "public/data/ops-snapshot.json");
  const raw = await readFile(snapshotPath, "utf8");
  return JSON.parse(raw);
}

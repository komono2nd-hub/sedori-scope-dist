import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const staticEntries = ["index.html", "privacy.html", "CNAME", "latest.json", "assets", "adapters", "license"];

await rm("dist", { recursive: true, force: true });
await mkdir("dist/client", { recursive: true });
await mkdir("dist/server", { recursive: true });

for (const entry of staticEntries) {
  await cp(entry, `dist/client/${entry}`, { recursive: true });
}

const worker = `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};\n`;

await writeFile("dist/server/index.js", worker);

import fs from "node:fs/promises";
import path from "node:path";

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // ignore
  }
}

async function copySqlFiles() {
  const srcDir = path.resolve(process.cwd(), "src", "db", "query");
  const destDir = path.resolve(process.cwd(), "dist", "db", "query");
  try {
    await ensureDir(destDir);
    const entries = await fs.readdir(srcDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".sql")) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);
        await fs.copyFile(srcPath, destPath);
      }
    }
    console.log("Copied SQL assets to dist/db/query");
  } catch (error) {
    console.error("Error copying SQL assets:", error);
    process.exit(1);
  }
}

copySqlFiles();

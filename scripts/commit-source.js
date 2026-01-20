import { execSync } from "child_process";

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

try {
  // Check if there are changes
  const status = execSync("git status --porcelain").toString();

  if (!status.trim()) {
    console.log("✅ No source changes to commit");
    process.exit(0);
  }

  console.log("📦 Committing source code...");

  run("git add .");

  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];

  run(`git commit -m "docs: update content (${timestamp})"`);

  run("git push origin main");

  console.log("✅ Source code committed & pushed safely");
} catch (err) {
  console.error("❌ Source commit failed");
  process.exit(1);
}

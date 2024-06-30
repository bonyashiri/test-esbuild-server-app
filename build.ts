import { createServer } from "esbuild-server";
import esbuild from "esbuild";

const mode = process.argv.includes("--watch") ? "watch" : "build";

const esbuildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  platform: 'browser',
  target: 'es2020',
};

if (mode === "build") {
  esbuild
    .build({
      ...esbuildOptions,
    })
    .catch(() => process.exit(1));
}

if (mode === "watch") {
  const port = parseInt(process.env.PORT || "8080");
  console.log(`Development server started at http://localhost:${port}`);
  createServer(
    { ...esbuildOptions },
    { port },
  ).start();
}

import * as esbuild from 'esbuild';

const isServe = process.argv.includes('--serve');

const config: esbuild.BuildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  platform: 'browser',
  target: 'es2020',
};

async function build() {
  if (isServe) {
    const ctx = await esbuild.context(config);
    await ctx.watch();
    const { host, port } = await ctx.serve({ servedir: 'dist' });
    console.log(`Development server running at http://${host}:${port}`);
  } else {
    await esbuild.build(config);
    console.log('Build complete');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});

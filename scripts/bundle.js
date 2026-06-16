// Bundles the makecode-node CLI (and all of its dependencies, including the
// makecode-core workspace) into a single self-contained file at bin/mkc.js.
//
// This exists so the package can be consumed as a git dependency: npm strips
// node_modules when packing a git dep, and this monorepo root declares no
// runtime dependencies, so an unbundled CLI would fail to resolve makecode-core
// / chalk / commander at runtime in the consumer. A single bundled file has no
// runtime node_modules requirements.
const path = require("path")
const esbuild = require("esbuild")

const root = path.join(__dirname, "..")

esbuild
    .build({
        entryPoints: [path.join(root, "packages", "makecode-node", "built", "cli.js")],
        outfile: path.join(root, "bin", "mkc.js"),
        bundle: true,
        platform: "node",
        target: "node18",
        format: "cjs",
        // make the output directly executable via the bin shim
        banner: { js: "#!/usr/bin/env node" },
        logLevel: "info",
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

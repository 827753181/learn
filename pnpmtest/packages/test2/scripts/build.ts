import { rollup, RollupOptions } from "rollup";
import vue from "rollup-plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import {
    babelConfigPath,
    inputDir,
    outputDir,
    pkgRoot,
    tsConfigPath,
} from "./path";
import { dirname, relative, resolve } from "path";
import { sync as fastSync } from "fast-glob";
import chalk from "chalk";
import postcss from "rollup-plugin-postcss";
import jsxPlugin from "@vitejs/plugin-vue-jsx";
import { Project, SourceFile } from "ts-morph";
import fs from "fs";

const commonsPlugins = [
    postcss({
        plugins: [],
        // extract: true,
        extensions: [".scss", ".css", ".less"],
        autoModules: true,
    }),
    // image({}),
    vue({}),
    nodeResolve(),
    jsxPlugin(),
    esbuild({
        tsconfig: tsConfigPath,
    }),
    getBabelOutputPlugin({
        configFile: babelConfigPath,
    }),
    commonjs(),
];
async function getFiles(options: { path?: string; pattern?: string } = {}) {
    const { path = inputDir, pattern = "**/*.(tsx|ts|jsx|js)" } = options;
    const files = await fastSync(pattern, {
        onlyFiles: true,
        globstar: true,
        cwd: path,
        ignore: ["**/__test__/**"],
    });
    return files.map((item) => ({
        path: resolve(path, item),
        name: item.split(".")[0],
    }));
}

async function buildFiles() {
    const files = await getFiles();
    const builds = files.map(async ({ path, name }) => {
        // see below for details on the options
        const inputOptions: RollupOptions = {
            input: path,
            external: (id) => {
                const packagejson = require(resolve(pkgRoot, "./package.json"));
                const deps = Object.keys(packagejson.dependencies);
                return deps.some(
                    (dep: string) => id.startsWith(dep) || id === dep
                );
            },
            plugins: commonsPlugins,
        };
        // create a bundle
        const bundle = await rollup(inputOptions);
        console.log(chalk.yellow(`start build files ${name}`));

        await bundle.write({
            format: "es",
            file: `${outputDir}/es/${name}.js`,
        });
        await bundle.write({
            format: "cjs",
            exports: "named",
            file: `${outputDir}/lib/${name}.js`,
        });
        console.log(chalk.green(`finish build files ${name}`));
    });
    try {
        await Promise.all(builds);
    } catch (e: any) {
        console.log(chalk.red(e.stack ?? e.message));
        process.exit(1);
    }
}

async function buildTypes(outDir: string = resolve(outputDir, "./es")) {
    const files = await getFiles({ pattern: "**/*.(tsx|ts)" });
    const project = new Project({
        tsConfigFilePath: tsConfigPath,
        compilerOptions: {
            emitDeclarationOnly: true,
            declaration: true,
            declarationDir: outDir,
            baseUrl: outputDir,
            rootDir: inputDir,
            noEmitOnError: false, //当ts类型报错，仍然生成.d.ts文件
        },
        skipAddingFilesFromTsConfig: true,
    });
    let sourceFiles: SourceFile[] = [];
    const builds = files.map(async ({ path, name }) => {
        sourceFiles.push(project.addSourceFileAtPath(path));
    });

    for (const sourceFile of sourceFiles) {
        const emitOutput = sourceFile.getEmitOutput();
        for (const outputFile of emitOutput.getOutputFiles()) {
            const filepath = outputFile.getFilePath();
            console.log(chalk.yellow(`start build file type ${filepath}`));

            await fs.promises.mkdir(dirname(filepath), {
                recursive: true,
            });
            const fileText = outputFile.getText();

            await fs.promises.writeFile(filepath, fileText, "utf8");
            console.log(chalk.green(`finish build file type ${filepath}`));
        }
    }

    try {
        await Promise.all(builds);
    } catch (e: any) {
        console.log(chalk.red(e.stack ?? e.message));
        process.exit(1);
    }
}

async function build() {
    console.log(chalk.yellow("start build files"));
    await buildFiles();
    await buildTypes();
    console.log(chalk.green("finish build files"));
}

build();

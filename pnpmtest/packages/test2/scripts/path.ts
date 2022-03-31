import path from "path";
export const projectRoot = path.resolve(__dirname, "../../../");
export const pkgRoot = path.resolve(__dirname, "../");
export const babelConfigPath = path.resolve(projectRoot, "./babel.config.js");
export const tsConfigPath = path.resolve(projectRoot, "./tsconfig.json");
export const outputDir = path.resolve(pkgRoot, "./");
export const inputDir = path.resolve(pkgRoot, "./src");

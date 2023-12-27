import child_process from "node:child_process";

const spawn = (cmd: string, args: string[]) => child_process.spawn(cmd, args, {shell: "/bin/bash", stdio: "inherit"});
const next = (callback: () => any) => (code: number) => code === 0 ? callback() : process.exit(code);

const src = process.argv[3].replaceAll(/\//g, "\\\/");

const reSource = () => {
    spawn("sed", ["-i", `'s/@mui\\/material/${src}/g'`, "src/index.tsx"]);
    return spawn("sed", ["-i", `'s/@mui\\/material/${src}/g'`, "src/types.ts"]);
}
const buildCJS = () => spawn("tsc", ["--module", "commonjs", "--outDir", process.argv[2]]);
const refactor = () => spawn("npm", ["run", "rename", "--", process.argv[2], "cjs"]);
const buildESM = () => spawn("tsc", ["--outDir", process.argv[2], "--declaration"]);
const deSource = () => {
    spawn("sed", ["-i", `'s/${src}/@mui\\/material/g'`, "src/index.tsx"]);
    return spawn("sed", ["-i", `'s/${src}/@mui\\/material/g'`, "src/types.ts"]);
}

reSource().on("exit", code => {
    return next(buildCJS)(code).on("exit", code => {
        return next(refactor)(code).on("exit", code => {
            return next(buildESM)(code).on("exit", next(deSource));
        });
    });
});

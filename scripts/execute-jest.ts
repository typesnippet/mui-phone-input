import process from "node:child_process";

import jestconfig from "../jestconfig.json";

const spawn = (cmd: string, args: string[]) => process.spawn(cmd, args, {shell: "/bin/bash", stdio: "inherit"});

spawn("./node_modules/.bin/jest", ["--config", `'${JSON.stringify(jestconfig)}'`]);

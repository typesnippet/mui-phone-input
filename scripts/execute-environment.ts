import child_process from "node:child_process";

import jestConfig from "../jestconfig.json";

const spawn = (cmd: string, args: string[]) => child_process.spawn(cmd, args, {shell: "/bin/bash", stdio: "inherit"});
const config = {...jestConfig, moduleNameMapper: {"@mui/material": process.argv[2]}};
spawn("jest", ["--config", `'${JSON.stringify(config)}'`]).on("exit", process.exit);

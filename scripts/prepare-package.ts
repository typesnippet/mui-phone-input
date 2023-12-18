import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;
const name = packageJson.name;

for (const pkgFile of ["examples/joy/package.json", "examples/mui/v4/package.json", "examples/mui/v5/package.json"]) {
    const packageSourceDirectory = /(\/v4\/|\/v5\/)/.test(pkgFile) ? "../../.." : "../..";
    const packageJson = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
    packageJson.dependencies[name] = `file:${packageSourceDirectory}/${name}-${version}.tgz`;
    fs.writeFileSync(pkgFile, JSON.stringify(packageJson, null, 2));
}

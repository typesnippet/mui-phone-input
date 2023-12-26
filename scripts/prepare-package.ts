import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;
const name = packageJson.name;

for (const pkgFile of ["examples/joy/package.json", "examples/core/package.json", "examples/material/package.json"]) {
    const packageJson = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
    packageJson.dependencies[name] = `file:../../${name}-${version}.tgz`;
    fs.writeFileSync(pkgFile, JSON.stringify(packageJson, null, 2));
}

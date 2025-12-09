const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node scripts/create-package.js <package-suffix>');
  console.error('Example: node scripts/create-package.js network  -> adds @orieken/faker-network');
  process.exit(1);
}

const rawName = args[0];
const pkgName = rawName.startsWith('faker-') ? rawName : `faker-${rawName}`;
const fullPkgName = `@orieken/${pkgName}`;
const pkgDir = path.join(__dirname, '../packages', pkgName);

if (fs.existsSync(pkgDir)) {
  console.error(`Error: Directory ${pkgDir} already exists.`);
  process.exit(1);
}

console.log(`Creating package ${fullPkgName} in ${pkgDir}...`);
fs.mkdirSync(pkgDir, { recursive: true });
fs.mkdirSync(path.join(pkgDir, 'src'), { recursive: true });

// 1. package.json
const pkgJson = {
  name: fullPkgName,
  version: "1.0.0",
  type: "module",
  main: "dist/index.js",
  types: "dist/index.d.ts",
  files: ["dist"],
  scripts: {
    "build": "tsc -b",
    "test": "vitest run"
  },
  peerDependencies: {
    "@faker-js/faker": "^9.0.0"
  },
  devDependencies: {
    "typescript": "^5.0.0",
    "vitest": "^1.0.0",
    "@faker-js/faker": "^9.0.0",
    "@types/node": "^20.0.0"
  }
};
fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

// 2. tsconfig.json
const tsConfig = {
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "declaration": true,
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "composite": true,
    "types": ["node", "vitest"]
  },
  "include": ["src"],
  "exclude": ["dist"]
};
fs.writeFileSync(path.join(pkgDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

// 3. vitest.config.ts
const vitestConfig = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
`;
fs.writeFileSync(path.join(pkgDir, 'vitest.config.ts'), vitestConfig);

// 4. src/index.ts
const indexTs = `export const create${capitalize(rawName)}Fx = (faker: any) => {
  return {
    example: () => 'Hello from ${fullPkgName}'
  };
};
`;
fs.writeFileSync(path.join(pkgDir, 'src/index.ts'), indexTs);

console.log(`Package scaffolded. Updating suite...`);

const suiteDir = path.join(__dirname, '../packages/faker-suite');

// 5. Update suite package.json
const suitePkgPath = path.join(suiteDir, 'package.json');
const suitePkg = JSON.parse(fs.readFileSync(suitePkgPath, 'utf8'));
suitePkg.dependencies = suitePkg.dependencies || {}; // Should be dependencies or peerDependencies + devDependencies
// Based on current file, suite has peerDeps and devDeps. 
// We add to both to be safe, or just devDeps and peerDeps.
suitePkg.peerDependencies = suitePkg.peerDependencies || {};
suitePkg.devDependencies = suitePkg.devDependencies || {};

suitePkg.peerDependencies[fullPkgName] = "^1.0.0";
suitePkg.devDependencies[fullPkgName] = "1.0.0"; // linking local workspace often uses precise version
fs.writeFileSync(suitePkgPath, JSON.stringify(suitePkg, null, 2));

// 6. Update suite tsconfig.json
const suiteTsConfigPath = path.join(suiteDir, 'tsconfig.json');
const suiteTsConfig = JSON.parse(fs.readFileSync(suiteTsConfigPath, 'utf8'));
suiteTsConfig.references = suiteTsConfig.references || [];
// Check if ref exists
const refPath = `../${pkgName}`;
if (!suiteTsConfig.references.some(r => r.path === refPath)) {
    suiteTsConfig.references.push({ path: refPath });
    fs.writeFileSync(suiteTsConfigPath, JSON.stringify(suiteTsConfig, null, 2));
}

console.log(`Running npm install to link packages...`);
try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (e) {
    console.warn("npm install failed. Please run it manually.");
}

console.log(`\nSUCCESS! Created ${fullPkgName}.`);
console.log(`Next steps:`);
console.log(`1. Implement logic in packages/${pkgName}/src/index.ts`);
console.log(`2. Update packages/faker-suite/src/index.ts to import and expose the new module.`);

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

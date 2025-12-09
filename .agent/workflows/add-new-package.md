---
description: Add a new package to the monorepo and link it to the suite
---

1. Run the creation script with your desired package name suffix:
   ```bash
   node scripts/create-package.js <name>
   # Example: node scripts/create-package.js network
   ```

2. The script will:
   - Create `packages/faker-<name>`
   - Scaffold `package.json`, `tsconfig.json`, `src/index.ts`
   - Add the new package as a dependency to `@orieken/faker-suite`
   - Update `packages/faker-suite/tsconfig.json` references
   - Run `npm install`

3. **Manual Step**: Open `packages/faker-suite/src/index.ts` and export the new functionality.
   - Import the factory/types: `import { createNetworkFx } from '@orieken/faker-network';`
   - Add to `FakerSuiteFx` interface.
   - Initialize in `fakerSuite` function.

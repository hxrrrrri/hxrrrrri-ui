# HXRRRRRI-UI Publishing Guide

This file documents the safe release flow for publishing HXRRRRRI-UI as an installable package.

## 1) Preconditions

- You have npm publish access for the package name.
- You are on a clean git branch.
- You have pulled latest main branch commits.

## 2) Verify package outputs

Run:

```bash
npm run build:lib
npm pack --dry-run
```

Expected package artifacts:

- dist/index.js
- dist/index.cjs
- dist/index.d.ts
- dist/style.css

## 3) First publish

```bash
npm login
npm whoami
npm run release:check
npm publish --access public
```

## 4) Update publish flow

Bump version:

```bash
npm run release:patch
# or
npm run release:minor
# or
npm run release:major
```

Then publish:

```bash
npm run release:check
npm publish --access public
git push origin HEAD --follow-tags
```

## 4.1) GitHub Actions release flow (recommended)

If you prefer releasing from GitHub UI:

1. Run workflow `Manual Version Bump` from the Actions tab.
2. Select `patch`, `minor`, or `major`.
3. After it pushes the version commit + tag, run workflow `Manual npm Publish`.
4. Choose branch `main`/`master` and dist-tag (`latest`, `next`, etc.).

Required secret:

- `NPM_TOKEN` in repository Actions secrets.

## 5) Consumer install commands

Registry install:

```bash
npm install hxrrrrri-ui framer-motion
```

GitHub install:

```bash
npm install github:hxrrrrri/hxrrrrri-ui
```

GitHub Packages install:

```bash
npm install @hxrrrrri/hxrrrrri-ui --registry=https://npm.pkg.github.com
```

## 5.1) Publish to GitHub Packages

Use workflow `Manual GitHub Packages Publish` from the Actions tab.

- It publishes the package as `@hxrrrrri/hxrrrrri-ui` to GitHub Packages.
- It does not affect npmjs `hxrrrrri-ui` publishing.

## 6) Consumer usage

```tsx
import 'hxrrrrri-ui/style.css'
import { ThemeProvider, HxButton } from 'hxrrrrri-ui'

export default function App() {
  return (
    <ThemeProvider>
      <HxButton system="luxury" variant="gradient">Launch</HxButton>
    </ThemeProvider>
  )
}
```

## 7) Common errors

- 403 / Not authorized: ensure npm owner access and correct account via npm whoami.
- Name already taken: use scoped package name, e.g. @hxrrrrri/hxrrrrri-ui.
- Missing files: run npm pack --dry-run and verify package.json files + exports.

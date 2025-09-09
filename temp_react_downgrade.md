# React Version Downgrade Instructions

To fix the Tawk.to i18next compatibility issue, you need to downgrade React from 19.0.0 to 18.x:

## Step 1: Update package.json
Change these dependencies in your package.json:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    // ... other dependencies remain the same
  }
}
```

## Step 2: Reinstall dependencies
```bash
yarn install
```

## Step 3: Clear cache and restart
```bash
# Clear yarn cache
yarn cache clean

# Remove node_modules and reinstall
rm -rf node_modules
yarn install

# Restart development server
yarn dev
```

This should resolve the "TypeError: t.$_Tawk.i18next is not a function" error.
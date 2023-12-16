# Project code format config

Run `npm install --save-dev prettier husky`

Run `npx husky install` it will create `.husky` directory -> husky - Git hooks installed

Run `npx husky add .husky/pre-commit "npm run format"` -> husky - created .husky/pre-commit

Add to `package.json`

```json
"scripts": {
  "format": "prettier --write ."
},
```

Now with each commit project code will be automatically formatted.

To manually format project: `npm run format`.

Add file `.prettierrc.json` in main directory.

```json
{
    "semi": true,
    "tabWidth": 4,
    "singleQuote": false,
    "jsxSingleQuote": false,
    "jsxBracketSameLine": true,
    "arrowParens": "always"
}
```

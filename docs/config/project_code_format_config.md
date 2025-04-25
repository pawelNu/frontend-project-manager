# Project code format config

In project directory find: `.git/hooks/pre-commit` and add:

```sh
yarn format
```

Add to `package.json`

```json
"scripts": {
  "format": "prettier --write ."
},
```

Now with each commit project code will be automatically formatted.

To manually format project: `yarn format`.

Add file `.prettierrc.json` in main directory.

```json
{
    "semi": true,
    "tabWidth": 4,
    "singleQuote": true,
    "bracketSameLine": true,
    "arrowParens": "always",
    "printWidth": 120
}
```

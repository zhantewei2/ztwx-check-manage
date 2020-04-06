# check-package

check package.json semantic version and auto install

# cli

```
npx ztwx-check-package [yarn]
```
- **yarn** default true.`optional` 。 If the version does not match then use `yarn` for the download。
download using `npm` via set it to false.

# node api
```
const checkPackage=require("@ztwx/check-package");
checkPackage();
```
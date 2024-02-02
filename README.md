# esbuild-watch-restart

I loved `nodemon` + `ts-node`, for CommonJS.
But unfortunately it is VERY DIFFICULT to set them up with ES Module.

So I did the same but with `esbuild`.

This package is designed to quickly solve the developper struggling issues related to ES Modules with `typescript` and `nodejs`, both build and watch/restart.

## Install

Prerequisites:

You should already have a npm project using typescript, want to compile it with ESM (EcmaScript Modules), have set `type=module` in `package.json`.

```
npm i -D @jlguenego/esbuild-watch-restart
```

## Use

To start a build like `nodemon`

```
npx ewr src/server.ts
```

For build only:

```
npx ewr --build-only src/server.ts
```

Of course this is better to create `scripts` in `package.json`:

```json
  "scripts": {
    "start": "ewr src/server.ts",
    "build": "ewr --build-only src/server.ts",
    "start:prod": "node dist/server.js",
    "clean": "rimraf dist",
    "lint": "eslint ."
  },
```

## Configuration

KISS : Keep It Stupidely Simple

No configuration except:

- `--build-only` option.

Feel free to ask more options but you know it is better to not have a lot.

## Examples

The repo has an `examples` project. Go in it to check its content.

## Improvement

I intend to maintain regularely this project. So feel free to make issue for making it better for your needs.

I develop for users, not for the beauty of code.

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>

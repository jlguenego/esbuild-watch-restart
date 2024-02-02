# esbuild-watch-restart

Like `nodemon` + `ts-node`, but with `esbuild`.

Designed to solve the user issues related to ES Modules with `typescript` and `nodejs`.

## Install

Prerequisites:

You should already have a npm project using typescript, want to compile it with ESM (EcmaScript Modules), have set `type=module` in `package.json`.

```
npm i -D @jlguenego@esbuild-watch-restart
```

## Use

To start a build like `nodemon`

```
ewr src/server.ts
```

For build only:

```
ewr --build-only src/server.ts
```

## Improvement

I intend to maintain regularely this project. So feel free to make issue for making it better for your needs.

I develop for users, not for the beauty of code.

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>

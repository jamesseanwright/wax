# Local Development

To build Wax and to run the example apps locally, you'll first need to run these commands in your terminal

```shell
git clone https://github.com/jamesseanwright/wax.git # or fork and use SSH if submitting a PR
cd wax
npm i
```

Then you can run one of the following scripts:

* `npm run build` - builds the library and outputs it to the `dist` dir, ready for publishing
* `npm run build-example` - builds the example app specified in the `ENTRY` environment variable, defaulting to `simple`
* `npm run dev` - builds the library, then builds and runs the example app specified in the `ENTRY` environment variable, defaulting to `simple`
* `npm test` - lints the source code (including `example`) and runs the unit tests. Append ` -- --watch` to enter Jest's watch mode

For more information on the example apps, consult the [README in the `example` folder](https://github.com/jamesseanwright/wax/blob/master/example/README.md).

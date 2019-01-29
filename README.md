# postgraphile-callback-plugin
You can pass callback functions to this plugin, which'll then be called when specific postgraphile hooks are triggered. The ability to pass such callbacks are useful for logging and many other things.

Right now, it only works for postgraphile:http:handler and postgraphile:http:end, which are called respectively when a GraphQL request is received and a result is just about to be sent back.

Use as:

```
const { postgraphile, makePluginHook } = require("postgraphile")
const { default: callbackPlugin } = require("postgraphile-callback-plugin")

const graphilePluginHook = makePluginHook([
  callbackPlugin
])

const graphileOpt = {
  pluginHook: graphilePluginHook,
  startCallbackFunction: myStartCallbackFunction,
  endCallbackFunction: myEndCallbackFunction}

postgraphile(pool, ["mySchema"], graphileOpt)
```
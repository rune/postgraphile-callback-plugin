/*
Uses server hooks exposed by Postgraphile
*/
import { PostGraphilePlugin } from "postgraphile"

interface RequestIncomingContext {
  options: any;
  res: any;
}

interface RequestEndContext {
  options: any;
  returnArray: boolean;
  req: any;
  res: any;
}

interface RequestEndContent {
  statusCode: any;
  result: any;
}

const callbackPlugin: PostGraphilePlugin = {
  ["postgraphile:options"](options) {
    const { startCallbackFunction, endCallbackFunction } = options;
    if (!(startCallbackFunction || endCallbackFunction)) {
      throw "Either startCallbackFunction or endCallbackFunction must be supplied!"
    }
    return options;
  },

  ["postgraphile:http:handler"](req, context:RequestIncomingContext) {
    const { options, res } = context;
    options.startCallbackFunction(req, res, options)
    return req;
  },

  ["postgraphile:http:end"](content:RequestEndContent, context:RequestEndContext) {
    const { statusCode, result } = content;
    const { req, res, options } = context;
    options.endCallbackFunction(req, res, statusCode, result, options)
    return content;
  }
};

export default callbackPlugin;
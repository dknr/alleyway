import {acceptable, acceptWebSocket, Context, isWebSocketCloseEvent} from "../deps.ts";

export const attachSocket = async (ctx: Context) => {
  if (!acceptable(ctx.request.serverRequest))
    throw new Error('unacceptable web socket!');

  console.log('accepting web socket...');
  const {conn, r: bufReader, w: bufWriter, headers} = ctx.request.serverRequest;
  const webSocket = await acceptWebSocket({conn, bufReader, bufWriter, headers});
  for await (let msg of webSocket) {
    webSocket.send('k.');
    console.log(msg);
    if (isWebSocketCloseEvent(msg)) {
      console.log('[EOM]');
      break;
    }
  }
}
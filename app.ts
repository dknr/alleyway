import {
  Application, Router, send,
} from './deps.ts';
import {attachSocket} from "./server/socket.ts";

const app = new Application();
const rte = new Router();

rte.get('/', async (ctx) => {
  await send(ctx, 'client/index.html', {root: Deno.cwd()});
});
rte.get('/client/static/bundle.js', async (ctx) => {
  // TODO: bundle client
  // TODO: generic static content
  await send(ctx, 'client/static/bundle.js');
});
rte.get('/ws', async (ctx) => {
  await attachSocket(ctx);
});

app.use(rte.allowedMethods());
app.use(rte.routes());
await app.listen({port: 3000});

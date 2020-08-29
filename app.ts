import {
  Application, Router, send,
} from './deps.ts';
import {attachSocket} from "./server/socket.ts";

console.log('bundling client...')
const [, bundle] = await Deno.bundle('client/mod.ts');
await Deno.writeTextFile('client/static/bundle.js', bundle);

const app = new Application();
const rte = new Router();

rte.get('/', async (ctx) => {
  await send(ctx, 'client/index.html', {root: Deno.cwd()});
});
rte.get('/static/bundle.js', async (ctx) => {
  // TODO: generic static content
  // TODO: cache bundle
  // ctx.response.body = bundle;
  await send(ctx, 'client/static/bundle.js');
});
rte.get('/ws', async (ctx) => {
  await attachSocket(ctx);
});

app.use(rte.allowedMethods());
app.use(rte.routes());

app.addEventListener('listen', ({port}) => {
  console.log(`listening on ${port}`);
});
await app.listen({port: 3000});

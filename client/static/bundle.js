// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("connect", [], function (exports_1, context_1) {
    "use strict";
    var newWebSocket, connect;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            newWebSocket = (addr) => new WebSocket(addr);
            exports_1("connect", connect = async ({ onMessage }) => new Promise((resolve, reject) => {
                let send = () => {
                    throw new Error('not connected');
                };
                let handleMessage = (message) => {
                    onMessage(message);
                };
                const ws = newWebSocket('ws://localhost:3000/ws');
                ws.addEventListener('open', () => {
                    send = (msg) => {
                        console.log('send', msg);
                        ws.send(msg);
                    };
                    resolve({
                        send,
                    });
                });
                ws.addEventListener('message', (event) => {
                    handleMessage(event);
                });
            }));
        }
    };
});
System.register("buttons", [], function (exports_2, context_2) {
    "use strict";
    var getElementById, attachButtons;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            getElementById = (id) => document.getElementById(id);
            exports_2("attachButtons", attachButtons = (send) => {
                const testBtn = getElementById('test-btn');
                if (!testBtn)
                    throw new Error('no test-btn ;(');
                testBtn.onclick = () => send('click!!');
            });
        }
    };
});
System.register("mod", ["connect", "buttons"], function (exports_3, context_3) {
    "use strict";
    var connect_ts_1, buttons_ts_1, main;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (connect_ts_1_1) {
                connect_ts_1 = connect_ts_1_1;
            },
            function (buttons_ts_1_1) {
                buttons_ts_1 = buttons_ts_1_1;
            }
        ],
        execute: function () {
            window.addEventListener('DOMContentLoaded', () => main());
            main = async () => {
                const { send } = await connect_ts_1.connect({
                    onMessage: (message) => console.log('recv', message.data),
                });
                send('connected!!');
                buttons_ts_1.attachButtons(send);
            };
        }
    };
});

__instantiate("mod", false);

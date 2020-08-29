Alleyway Drinking Simulator
===========================
![king-of-the-hill.png](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.thr.com%2Fsites%2Fdefault%2Ffiles%2F2017%2F08%2Fking_of_the_hill_group_01_-_h_20178_0.jpg&f=1&nofb=1)

A multiplayer simulator for hanging out in an alleyway with friends.

What Works
----------
- send/receive messages via web socket
- auto-bundle client code (sorta)
  - one-time bundle for prod
  - every-time bundle for dev (not working)

What Doesn't Work
-----------------
- run directly from network (Deno feature)
  - runtime client bundler relies on filesystem, doesn't work for net-run
  - could detect this at runtime and swap out script src in index.html
- chat system
  - ezpz proof of concept, just gotta add a textbox for rx/tx
- distributed state
  - use Redux?
  - pub/sub actions
  - duplicate state on client and server, sync occasionally
- Entity-Component-System for game engine
  - port from https://dknr.io/dev/flatlander
- 3D graphics via WebGL
  - THREE.js?

What May Eventually Work Given Enough Effort
--------------------------------------------
- VR support

Instructions
------------
First, install Deno.

Then, run it directly from network (this also does not work!):
```
deno --allow-net https://raw.githubusercontent.com/dknr/alleyway/master/app.ts
```

Or, clone the repo and run it from local disk:
```
$ git clone https://github.com/dknr/alleyway
$ cd alleyway
$ deno --allow-net app.ts
```

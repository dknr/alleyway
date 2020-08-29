export type Send = (message: any) => void;

type ConnectProps = {
  onMessage: (message: MessageEvent) => void;
}
type Connection = {
  send: Send;
}

// @ts-ignore - workaround missing dom types
const newWebSocket = (addr: string) => new WebSocket(addr);

export const connect = async ({onMessage}: ConnectProps): Promise<Connection> => new Promise<Connection>(
  (resolve, reject) => {
    let send: Send = () => {
      throw new Error('not connected');
    };
    let handleMessage = (message: any) => {
      onMessage(message);
    }

    const ws = newWebSocket('ws://localhost:3000/ws');
    ws.addEventListener('open', () => {
      send = (msg) => {
        console.log('send', msg);
        ws.send(msg);
      }

      resolve({
        send,
      });
    });
    ws.addEventListener('message', (event: MessageEvent) => {
      handleMessage(event);
    });
  }
);

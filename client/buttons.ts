import {Send} from "./connect.ts";

// @ts-ignore - workaround missing dom types
const getElementById = (id: string) => document.getElementById(id);

export const attachButtons = (send: Send) => {
  const testBtn = getElementById('test-btn');
  if (!testBtn)
    throw new Error('no test-btn ;(');

  testBtn.onclick = () => send('click!!');
}
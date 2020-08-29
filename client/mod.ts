import {connect} from './connect.ts';
import {attachButtons} from './buttons.ts';

window.addEventListener('DOMContentLoaded', () => main());

const main = async () => {
  const {send} = await connect({
    onMessage: (message) => console.log('recv', message.data),
  })
  send('connected!!');

  attachButtons(send)
}
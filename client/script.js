import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatcontainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    element.textContent += '.'
    if (element.textContent.length === 3) {
      element.textContent = ''
    }
  }, 300)
}


import bot from "./assets/bot.svg";
import user from "./assets/user.svg"

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent.length === 4) {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniquieId() {
  const timestamp = Date.now();
  const randomNumber = Math.random() * 1000000;
  const hex = randomNumber.toString(16);

  return `id-${timestamp}-${hex}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (
  `
    <div class="wrapper ${isAi && "ai"}">
       <div class='chat'>
          <div class='profile>
              <img 
              src="${isAi ? bot : user}" 
              alt="${isAi ? "bot" : "user"}" />
          </div>
          <div class='message' id=${uniqueId}>${value}</div>  
        </div>
    </div>
    `
  )
}

// Hsndles AI Chat with user input and Ai output
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // Generates User Chat 
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
  // Clears Form
  form.reset();

  // Generates AI Chat
  const uniqueId = generateUniquieId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  // Puts new message in view 
  chatContainer.scrollTop = chatContainer.scrollHeight;

  
  const messageDiv = document.getElementById(uniqueId);
   // Loader
  loader(messageDiv);
  

}

// Event listener for form submit
form.addEventListener("submit", handleSubmit);
// Event listener for enter key
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
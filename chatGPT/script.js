const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const API_KEY = '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'

sendButton.addEventListener('click', sendMessage);

async function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  appendMessage('You', message);

  const response = await getChatGPTResponse(message);
  appendMessage('ChatGPT', response);

  messageInput.value = '';
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getChatGPTResponse(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": message
        }
      ],
      
      max_tokens: 3000
    })
  });

  const data = await response.json();
  console.log(data.choices[0].message.content)
  return data.choices[0].message.content
}
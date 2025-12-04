let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input");

const Api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCy8zG3UcH_atYe4gN6Hw6u9m7MvBdAgOs";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null
  }
};

async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");

  let RequestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: user.message },
            ...(user.file.data ? [{ inline_data: user.file }] : [])
          ]
        }
      ]
    })
  };

  try {
    let response = await fetch(Api_Url, RequestOption);
    let data = await response.json();
    console.log(data);

    let apiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        ?.trim();

    text.innerHTML = apiResponse;
  } catch (error) {
    console.log(error);
  } finally {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth"
    });
     image.src=`img.svg`;
    image.classList.remove("choose");
    user.file = {
         mime_type: null,
      data: null
    }
    };
  }


function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.classList.add(classes);
  div.innerHTML = html;
  return div;
}

function handlechatResponse(userMessage) {
  user.message = userMessage;

  let html = `
    <img src="download.jpeg" width="8%" id="userImage">
    <div class="user-chat-area">
        ${user.message}
        
      ${
        user.file.data
          ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>`
          : ""
      }
      
    </div>`;

  prompt.value = "";

  let userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth"
  });

  setTimeout(() => {
    let html = `
      <img src="cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.avif" width="10%" id="aiImage">
      <div class="ai-chat-area">
        <img src="loading.webp" width="50" class="load">
      </div>`;

    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);

    generateResponse(aiChatBox);
  }, 600);
}

prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlechatResponse(prompt.value);
  }
});

submitbtn.addEventListener("click", () => {
    handlechatResponse(prompt.value);
});

imageinput.addEventListener("change", () => {
  const file = imageinput.files[0];
  if (!file) return;

  let reader = new FileReader();

  reader.onload = (e) => {
    let base64string = e.target.result.split(",")[1];

    user.file = {
      mime_type: file.type,
      data: base64string
    };

    // preview now works correctly
    image.src = `data:${file.type};base64,${base64string}`;
    image.classList.add("choose");
  };

  reader.readAsDataURL(file);
});



imagebtn.addEventListener("click", () => {
  imageinput.click();
});

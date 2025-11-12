let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.classList.add(classes)
    div.innerHTML=html
    return div
}
function handlechatResponse(message){
    let html=`<img src="download.jpeg" alt="" id="userImage"width="60">
            <div class="user-chat-area">
            ${message}
            
            </div>`
prompt.value=""
            let userChatBox=createChatBox(html,"user-chat-box")
chatContainer.appendChild(userChatBox)

setTimeout(() => {
  let html=`<img src="cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.avif" alt="" id="aiImage" width="70">
            <div class="ai-chat-area">
            <div class="loading.webp" alt="" class="load" width="50px"></div>
            </div>`
            let aiChatBox=createChatBox(html,"ai-chat-box")
chatContainer.appendChild(aiChatBox)

},600)

}


prompt.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"   ){
        handlechatResponse(prompt.value)

    }
    
    
})
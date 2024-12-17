document.addEventListener('DOMContentLoaded', () => {
    const startChatBtn = document.getElementById('start-chat-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const chatScreen = document.getElementById('chat-screen');
    const userMessageInput = document.getElementById('user-message');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');


    // Start Chat 버튼 클릭 시 화면 전환
    startChatBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
    });


    // 메시지를 추가하는 함수
    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);


        // 스크롤을 아래로 이동
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };


    // 메시지 전송 처리 함수
    const sendMessage = () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            userMessageInput.value = '';


            // 봇 응답 추가 (예제)
            setTimeout(() => {
                addMessage('LAWBUDDY에서 제공하는 답변입니다.', 'bot');
            }, 500);
        }
    };


    // Send 버튼 클릭 이벤트
    sendBtn.addEventListener('click', sendMessage);


    // Enter 키 입력 시 메시지 전송
    userMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 Enter 동작 방지
            sendMessage();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const startChatBtn = document.getElementById('start-chat-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const chatScreen = document.getElementById('chat-screen');
    const userMessageInput = document.getElementById('user-message');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // 질문과 답변 데이터셋
    const responses = {
        "안녕하세요.": "안녕하세요. LAWBUDDY 입니다. 무엇을 도와드릴까요?",
        "수강료를 환불받으려고 보니까, 위약금이나 센터시설이용료, 카드 수수료 등을 제외하고 나머지 금액만 돌려준다고 되어 있더라고. 이게 문제가 없는지 궁금해.": "‘위약금 환불’에 관한 법률 제31조에 따르면 해당 내용은 문제가 될 수 있습니다. 고객의 해지권을 제한하고, 법적 기준보다 더 많은 금액을 위약금으로 부과하므로 부당하게 불리한 조항으로 해석될 여지가 큽니다.",
        "헬스장 등록했는데 갑자기 다리를 다쳐서 운동을 못 하게 되었어. 환불받을 수 있을까?": "‘방문판매’ 등에 관한 법률 제31조 및 체력단련장 이용 표준약관 제8조에 따르면 이용자는 언제든지 계약을 해지할 수 있습니다. 하지만 계약 해지 시 회사는 실제 사용한 부분을 제외하고 위약금이나 시설이용료를 차감한 뒤 환불을 진행해야 합니다.",
        "제9조 1항의 내용 요약해줘.": "제 9조 1항은 계약이 해제되는 경우 각 당사자는 상대방에 대하여 원상회복의 의무가 있는 바 중도금 지급지연 등으로 발생한 연체료는 중도금 등의 일부라 할 것이므로 원상회복의 범위에 속함에도 이를 반환하지 않을 수 있도록 한 것은 계약의 해지로 인한 사업자의 원상회복의무를 부당하게 경감하는 조항입니다.",
        "기타 문의는 어디에 하나요?": "기타 문의사항은 해당 법률 사무소나 관련 고객센터에 문의해주세요. 다음에도 궁금한 점이 있으면 LAWBUDDY로 방문해주세요."
    };

    // 타이핑 효과를 위한 함수
    const typeText = (element, text, speed = 70) => {
        element.textContent = "";
        let index = 0;

        const typing = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typing, speed);
            }
        };
        typing();
    };

    // 화면 전환
    startChatBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
    });

    // 메시지 추가 함수
    const addMessage = (message, sender, isTyping = false) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        if (isTyping) {
            typeText(messageElement, message);
        } else {
            messageElement.textContent = message;
        }
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // 사용자 입력 처리 및 챗봇 응답
    const sendMessage = () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user'); // 사용자 메시지 추가
            userMessageInput.value = ''; // 입력 필드 초기화

            // 봇 응답 처리
            setTimeout(() => {
                const response = responses[userMessage] || "죄송합니다. 이해하지 못했어요. 다른 질문을 해주세요.";
                addMessage(response, 'bot', true); // 타이핑 효과 적용
            }, 500);
        }
    };

    // Send 버튼 클릭 이벤트
    sendBtn.addEventListener('click', sendMessage);

    // Enter 키 입력 시 메시지 전송
    userMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
});

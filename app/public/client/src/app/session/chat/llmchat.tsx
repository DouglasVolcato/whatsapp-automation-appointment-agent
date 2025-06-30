import { AccessCredentialsStorage } from '@/utils/access-credentials-storage';
import { FloatDiv } from '@/components/atoms/floating-div/floating-div';
import { useRequestSender } from '@/hooks/use-request-sender';
import { useState, useRef } from 'react';
import { Env } from '@/config/env';
import './styles.css';

export default function LlmChat() {
    const { post_request } = useRequestSender();
    const [inputMessage, setInputMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<{ isUser: boolean, content: string }[]>([]);
    const messageHistoryRef = useRef<string[]>([]);
    const number = getOrGenerateAndStoreNumber();
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    function scrollToBottom() {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }


    function getOrGenerateAndStoreNumber() {
        const storedNumber = localStorage.getItem('myNumber');
        if (storedNumber) {
            return storedNumber;
        } else {
            const newNumber = Math.floor(Math.random() * 10000000000).toString();
            localStorage.setItem('myNumber', newNumber);
            return newNumber;
        }
    }

    function escapeHtml(text: string) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    function linkify(text: string) {
        const urlRegex = /(https?:\/\/[^\s<]+)/g;
        return text.replace(urlRegex, (url) => {
            const escapedUrl = escapeHtml(url);
            return `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${escapedUrl}</a>`;
        });
    }

    function formatMessageText(text: string) {
        const linked = linkify(text);
        return linked.replace(/\n/g, '<br>');
    }

    const submitChat = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage;
        setChatMessages(prev => {
            const updated = [...prev, { isUser: true, content: userMessage }];
            setTimeout(scrollToBottom, 0);
            return updated;
        });
        messageHistoryRef.current.push(userMessage);
        setInputMessage('');

        const data = await post_request(
            `${Env.API_URL}/ai/send-message`,
            { number, messages: messageHistoryRef.current },
            {
                token: AccessCredentialsStorage.get().token
            }
        );

        if (data.response) {
            setChatMessages(prev => {
                const updated = [...prev, { isUser: false, content: data.response }];
                setTimeout(scrollToBottom, 0);
                return updated;
            });

        }
    };

    return (
        <FloatDiv fitContent removePadding>
            <div className="chat-container">
                <div className="chat-header">Chat</div>
                <div className="chat-messages" id="chatMessages">
                    {chatMessages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
                            dangerouslySetInnerHTML={{ __html: formatMessageText(msg.content) }}
                        />
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <form
                    className="chat-form"
                    id="chatForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitChat();
                    }}
                >
                    <input
                        onChange={e => setInputMessage(e.target.value)}
                        type="text"
                        id="chatInput"
                        placeholder="Digite sua mensagem..."
                        value={inputMessage}
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </FloatDiv>
    );
}

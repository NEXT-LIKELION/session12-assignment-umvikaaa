import { useState } from "react";
import { correctGrammar } from "./openai";
import ChatBubble from "./components/ChatBubble";
import TopicButtons from "./components/TopicButtons";
import tiger from "./assets/tiger.png";
import "./App.css";

function App() {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [wordCount, setWordCount] = useState(0);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        setWordCount(text.length);
    };

    const handleSelectTopic = (item) => {
        setSelectedTopic(item);
        setInputText("");
        setWordCount(0);
    };

    const handleCheckGrammar = async () => {
        if (!inputText.trim()) return;

        const userMessage = { text: inputText, type: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setWordCount(0);

        try {
            const corrected = await correctGrammar(userMessage.text);

            // 🐯 기준으로 수정본과 이유 나누기
            const parts = corrected.split("Причины исправления:");
            const correction = parts[0]
                ?.replace("🐯 Исправленная версия:", "")
                .trim();
            const explanation = parts[1]?.trim();

            const botCorrection = {
                text: `🐯 수정된 문장:\n${correction}`,
                type: "bot",
            };
            const botExplanation = {
                text: `📝 수정 이유 (러시아어):\n${explanation}`,
                type: "bot",
            };

            setMessages((prev) => [...prev, botCorrection, botExplanation]);
        } catch (error) {
            console.error(error);
            const errorMessage = {
                text: "❌ 오류가 발생했습니다. 다시 시도해 주세요.",
                type: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    const handleReset = () => {
        setInputText("");
        setMessages([]);
        setSelectedTopic(null);
        setWordCount(0);
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 font-sans">
            <img src={tiger} alt="호랑이" className="w-24 mb-4" />
            <h1 className="text-2xl font-bold text-mainGreen mb-4">
                TOPIK 쓰기 연습 챗봇 🐯
            </h1>

            <TopicButtons
                selectedTopic={selectedTopic}
                onSelect={handleSelectTopic}
            />

            {/* 주제명 + 키워드 + 질문 표시 */}
            {selectedTopic && (
                <div className="mb-4 text-center">
                    <div className="text-lg font-semibold text-mainGreen">
                        {selectedTopic.topic}
                    </div>
                    <div className="text-gray-700 text-sm mb-2">
                        {selectedTopic.keywords.join(", ")}
                    </div>
                    <div className="text-gray-600 italic">
                        {selectedTopic.question}
                    </div>
                </div>
            )}

            {/* 입력창 */}
            <textarea
                className="w-full max-w-2xl h-32 p-3 border rounded mb-2 focus:outline-none"
                placeholder="여기에 글을 작성하세요..."
                value={inputText}
                onChange={handleInputChange}
            />

            {/* 글자 수 표시 */}
            <div className="text-gray-600 mb-4">
                현재 글자 수: {wordCount}자
            </div>

            {/* 검사하기 + 초기화 버튼 */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleCheckGrammar}
                    className="bg-mainGreen hover:bg-green-500 text-white px-6 py-2 rounded"
                >
                    검사하기
                </button>

                <button
                    onClick={handleReset}
                    className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded"
                >
                    초기화
                </button>
            </div>

            {/* 채팅창 */}
            <div className="w-full max-w-2xl bg-white rounded p-4 shadow">
                {messages.map((msg, idx) => (
                    <ChatBubble key={idx} text={msg.text} type={msg.type} />
                ))}
            </div>
        </div>
    );
}

export default App;

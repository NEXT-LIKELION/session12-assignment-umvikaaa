function ChatBubble({ text, type }) {
    const isUser = type === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}
        >
            <div
                className={`max-w-xs p-3 rounded-lg ${
                    isUser
                        ? "bg-mainGreen text-white"
                        : "bg-gray-300 text-black"
                }`}
            >
                {text}
            </div>
        </div>
    );
}

export default ChatBubble;

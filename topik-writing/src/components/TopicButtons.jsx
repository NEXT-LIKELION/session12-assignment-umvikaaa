function TopicButtons({ selectedTopic, onSelect }) {
    const topics = [
        {
            topic: "취미",
            keywords: [
                "취미 (хобби)",
                "여가시간 (свободное время)",
                "활동 (деятельность)",
            ],
            question: "어떤 취미가 있어요?",
        },
        {
            topic: "가족",
            keywords: [
                "가족 (семья)",
                "부모님 (родители)",
                "형제자매 (братья и сёстры)",
            ],
            question: "가족에 대해 소개해 주세요.",
        },
        {
            topic: "여행",
            keywords: [
                "여행 (путешествие)",
                "관광지 (достопримечательность)",
                "비행기 (самолёт)",
            ],
            question: "최근에 간 여행지가 있나요?",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
            {topics.map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(item)}
                    className={`px-4 py-2 rounded-full text-sm
            ${
                selectedTopic?.topic === item.topic
                    ? "bg-mainGreen text-white"
                    : "bg-green-300 hover:bg-green-400 text-white"
            }`}
                >
                    {item.topic}
                </button>
            ))}
        </div>
    );
}

export default TopicButtons; // << 이 줄 꼭 있어야 한다!!!

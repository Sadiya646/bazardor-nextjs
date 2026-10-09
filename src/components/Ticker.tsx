
export default function Ticker() {
  const messages = [
    "Welcome to BazarDor",
    "Best Deals on Daily Essentials",
    "Fresh Products at Great Prices",
    "Shop Smart, Save More!",
  ];

  return (
    <div className="overflow-hidden bg-green-700 py-2 text-white">
      <div className="flex w-max animate-ticker whitespace-nowrap">
        {[...messages, ...messages].map((message, index) => (
          <span
            key={index}
            className="mx-6 text-sm font-medium"
          >
            ★ {message}
          </span>
        ))}
      </div>
    </div>
  );
}

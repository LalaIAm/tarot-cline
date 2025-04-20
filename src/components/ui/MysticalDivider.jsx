const MysticalDivider = ({ symbol, className = "" }) => {
  // Default symbols for mystical dividers
  const symbols = {
    star: "★",
    moon: "☽",
    sun: "☼",
    comet: "☄",
    sparkles: "✨",
    lotus: "✿",
    infinity: "∞",
    eye: "◉",
    default: "✧"
  };

  // Get the symbol character or use the provided custom symbol
  const symbolChar = symbols[symbol] || symbol || symbols.default;

  return (
    <div className={`mystical-divider ${className}`}>
      <div className="w-full"></div>
      <span className="symbol font-display text-xl mx-4">{symbolChar}</span>
      <div className="w-full"></div>
    </div>
  );
};

export default MysticalDivider;

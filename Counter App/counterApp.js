const $ = document.querySelector.bind(document);
const { useState } = React;

function CounterApp() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };
  const handleReset = () => setCount(0);
  return (
    <>
      <div className="counter-app">
        <h1>Counter App</h1>
        <div
          className={`count ${
            count < 0 ? "negative" : count > 0 ? "positive" : "default"
          }`}
        >
          {count}
        </div>
        <div
          className={`status ${
            count < 0 ? "negative" : count > 0 ? "positive" : "zero"
          }`}
        >
          {count < 0 ? "Negative" : count > 0 ? "Positive" : "Zero"}
        </div>
        <div className="btn-wrapper">
          <button className="decrement" onClick={handleDecrease}>
            Decrease (-1)
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
          <button className="increment" onClick={handleIncrease}>
            Increase (+1)
          </button>
        </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot($("#root"));
root.render(<CounterApp />);

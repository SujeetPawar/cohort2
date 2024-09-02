import { useContext, useState } from "react";
import { counterContext } from "./components/Context";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <counterContext.Provider value={count}>
        <Count setCount={setCount} />
      </counterContext.Provider>
    </div>
  );
}

function Count({ setCount }) {
  const count = useContext(counterContext);
  return (
    <div>
      <CountRenderer />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CountRenderer() {
  const count = useContext(counterContext);
  return <div>{count}</div>;
}

function Buttons({ setCount }) {
  const count = useContext(counterContext);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;

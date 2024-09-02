import "./App.css";
import { useMousePointer } from "./hooks/useMousePointer";

function App() {
  const mousePointer = useMousePointer();

  return (
    <div>
      Your Mouse Position is {mousePointer.x} {mousePointer.y}
    </div>
  );
}

export default App;

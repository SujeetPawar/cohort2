import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [exchangeReturn, setExchangeReturn] = useState({});
  const [bank, setBank] = useState({});
  console.log("rerendering");

  useEffect(() => {
    setTimeout(() => {
      setBank({ income: 1000 });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setExchangeReturn({
        returns: 8000,
      });
    }, 1000);
  }, []);

  const incometax = (bank.income + exchangeReturn.returns) * 0.3;

  return <div className="container">The toatl tax is {incometax}</div>;
}

export default App;

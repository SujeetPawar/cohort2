import { Route , BrowserRouter, Routes } from "react-router-dom"
import { Sender } from "./component/Sender"
import { Receiver } from "./component/Receiver"
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path  = "/sender" element = {<Sender/>} />
        <Route path  = "/receiver" element = {<Receiver />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal/Modal";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <button className="bg-blue-900 text-white rounded cursor-pointer py-0.5 px-3" onClick={() => setOpen(p => !p)}>Open Modal</button>
      <Modal open={open} close={() => setOpen(false)}>
        <h1>Hello I am inside Model</h1>
      </Modal>
    </div>
  );
}

export default App;

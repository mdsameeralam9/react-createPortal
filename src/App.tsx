// Example usage inside a page/component
import React, { useState } from "react";
import Modal from "./components/Modal/Modal";


export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>

      <Modal open={open} close={() => setOpen(false)} ariaLabel="Example dialog">
        <header className="border-b p-4">
          <h2 className="text-lg font-semibold">Modal title</h2>
        </header>
        <main className="p-4 space-y-3">
          <p>Modal content goes here.</p>
          <button className="rounded bg-gray-200 px-3 py-1" onClick={() => alert("Action!")}>
            Action
          </button>
        </main>
        <footer className="flex justify-end gap-2 border-t p-4">
          <button
            className="rounded px-3 py-1"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="rounded bg-blue-600 px-3 py-1 text-white"
            onClick={() => setOpen(false)}
          >
            Confirm
          </button>
        </footer>
      </Modal>
    </div>
  );
}

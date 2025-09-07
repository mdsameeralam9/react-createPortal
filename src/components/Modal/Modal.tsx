import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, close }) => {
  const [element, setElement] = React.useState<Element | null>(null);
 
  useLayoutEffect(() => {
    // need to insert id in index.html;
    const modalIdDiv = document.createElement('div');
    modalIdDiv.setAttribute('id', 'modalRoot');
    document.body.appendChild(modalIdDiv);
    const modalRootId = document.getElementById('modalRoot'); 
    setElement(modalRootId);

    return () => {
      if (modalRootId) {
        document.body.removeChild(modalRootId);
      }
    };
  }, [])

   if (!open || !element) return null;

  return ReactDOM.createPortal(
    <div className="bg-gray-300 z-10 fixed inset-0 w-full h-screen overflow-auto flex justify-center items-center">
      <div onClick={() => close()}>
        <>
        {children}
        </>
      </div>
    </div>,
    element as HTMLElement
  );
};

export default Modal;

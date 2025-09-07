import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  // Optional a11y improvements
  ariaLabel?: string;       
  ariaLabelledBy?: string;    
}

const getModalRoot = (): HTMLElement | null => {
  if (typeof document === "undefined") return null;
  let root = document.getElementById("modal-root");
  if (!root) {
    // Fallback: create once if no already
    root = document.createElement("div");
    root.setAttribute("id", "modal-root");
    document.body.appendChild(root);
  }
  return root as HTMLElement;
};

const Modal: React.FC<ModalProps> = ({ open, close, children, ariaLabel, ariaLabelledBy }) => {
  const modalRoot = useMemo(() => getModalRoot(), []);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

 
  // Click outside to close
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  if (!open || !modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={onBackdropClick}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
        className="max-h-[90vh] w-[min(90vw,42rem)] overflow-auto rounded-lg bg-white shadow-xl outline-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

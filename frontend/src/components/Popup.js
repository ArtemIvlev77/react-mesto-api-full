import React, { useEffect } from "react";

function Popup(props) {
  const [isOpen, onClose] = [props.isOpen, props.onClose];
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        isOpen && "popup_is-opened"
      }`}
      onMouseDown={(event) =>
        event.target.classList.contains("popup") && onClose()
      }
    >
      <div className="popup__container">
        {props.children}
        <button
          name="close-button"
          type="button"
          className="popup__closeBtn"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;

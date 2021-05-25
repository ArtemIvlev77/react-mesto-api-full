import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_elementPreview ${
        props.card ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__container popup__image-preview-container">
        <button
          type="button"
          className="popup__closeBtn"
          onClick={props.onClose}
        />
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image-preview"
        />
        <p className="popup__text popup__title popup__title_image-preview">
          {props.card.name}
        </p>
      </div>
    </div>
  );
}
export default ImagePopup;

import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState();
  const [link, setLink] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlacePopup({ name, link });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      type="newElement"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        id="new-element-name"
        type="text"
        className="popup__text popup__text_valid popup__element-title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span id="new-element-name-error" className="popup__error" />
      <input
        name="link"
        id="url-element"
        type="url"
        className="popup__text popup__text_valid popup__element-link"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span id="url-element-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;

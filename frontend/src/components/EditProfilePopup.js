import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext, useState, useEffect } from "react";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [about, setAbout] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      type="profileEditor"
      title="Редактировать профиль"
      value={props.value}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        id="profile-name"
        type="text"
        value={name || ""}
        onChange={handleNameChange}
        className="popup__text popup__text_valid popup__name-input"
        required
        minLength="2"
        maxLength="40"
      />
      <span id="profile-name-error" className="popup__error" />
      <input
        name="job"
        id="profile-job"
        type="text"
        value={about || ""}
        onChange={handleAboutChange}
        className="popup__text popup__text_valid popup__job-input"
        required
        minLength="2"
        maxLength="200"
      />
      <span id="profile-job-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;

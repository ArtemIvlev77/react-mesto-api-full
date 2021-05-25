import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const refAvatar = useRef();
  
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }

  useEffect(() => {
    refAvatar.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      type="popupEditAvatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      value={props.value}
      onSubmit={handleSubmit}
    >
      <input
        name="avatar"
        id="URL"
        type="url"
        className="popup__text popup__text_valid popupAvatarUrl"
        placeholder="Ссылка на аватар"
        required
        ref={refAvatar}
      />
      <span id="URL-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

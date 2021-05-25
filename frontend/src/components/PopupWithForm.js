function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.type} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__closeBtn"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form ${props.type}-form`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <input
            type="submit"
            value={props.value}
            className="popup__save-btn profileEditor-saveBtn"
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardRemoveBtnClassName = `element__remove-btn ${
    isOwn ? "element__remove-btn_visible" : "element__remove-btn_hidden"
  }`;
  const cardLikeBtnClassName = `element__like-btn ${
    isLiked ? "element__like-btn_active" : ""
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }
  return (
    <li className="element">
      <img
        className="element__image-btn element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h3 className="element__title">{props.card.name}</h3>
        <button className={cardRemoveBtnClassName} onClick={handleCardDelete} />
        <div className="element__like-container">
          <button className={cardLikeBtnClassName} onClick={handleLikeClick} />
          <div className="element__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;

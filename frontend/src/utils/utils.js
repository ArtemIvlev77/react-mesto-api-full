export const profileInputSelector = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
};

export const profileName = document.querySelector(profileInputSelector.nameSelector);
export const profileJob = document.querySelector(profileInputSelector.jobSelector);
export const avatar = document.querySelector(profileInputSelector.avatarSelector);

export const settings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_invalid',
  inputErrorClass: 'popup__text_invalid',
});


export const CARD_TEMPLATE = document.querySelector(".template");
export const popupNewElement = document.querySelector('.newElement');
export const popupNewElementForm = popupNewElement.querySelector('.newElement-form');
export const popupNewElementFormInputTitle = popupNewElement.querySelector('.popup__element-title');
export const popupNewElementFormInputUrl = popupNewElement.querySelector('.popup__element-link')

export const buttonOpenPopupProfileEditor = document.querySelector('.profile__edit-btn');
export const buttonOpenPopupNewElement = document.querySelector('.profile__add-btn');


export const popupProfileEditor = document.querySelector('.profileEditor');
export const formPopupProfileEdit = popupProfileEditor.querySelector('.profileEditor-form');
export const nameInput = document.querySelector('.popup__name-input');
export const jobInput = document.querySelector('.popup__job-input');

export const popupEditAvatar = document.querySelector('.popupEditAvatar');
export const popupAvatarLink = popupEditAvatar.querySelector('.popupAvatarUrl');
export const profileEditAvatarBtn = document.querySelector('.profile__avatar');

export const formPopupEditAvatar = popupEditAvatar.querySelector('.popup__form');


export const elementContainer = document.querySelector('.elements');

import {
  config,
  initialCards,
  editBtn,
  addBtn,
  popupEdit,
  popupAdd,
  popupImg,
  image,
  caption,
  formEdit,
  formAdd,
  popupName,
  subtitle,
  title,
  link,
  profileName,
  profileSub,
  cardTemplate,
  elList,
  popups
}
from './const.js';
import {
  FormValidator
}
from './FormValidator.js';
import {
  Card
}
from './Card.js';

function createCard(link, title) {
  const newCard = new Card(link, title, cardTemplate, image, caption, elList, popupImg);
  newCard.createCard();
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', escapeClose);
};
export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', escapeClose);
  formAddValidation.errorCleaner();
  formEditValidation.errorCleaner();
};

function submitAdd(el) {
  el.preventDefault();
  createCard(link.value, title.value);
  closePopup(popupAdd);
}

function submitEdit(el) {
  el.preventDefault();
  profileName.textContent = popupName.value;
  profileSub.textContent = subtitle.value;
  closePopup(popupEdit);
}
initialCards.forEach(function(item) {
  createCard(item.link, item.name);
});
editBtn.addEventListener('click', function openForm() {
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  subtitle.value = profileSub.textContent;
});
formEdit.addEventListener('submit', (el) => submitEdit(el));
addBtn.addEventListener('click', function openForm() {
  openPopup(popupAdd);
  formAdd.reset();
  formAddValidation.disabledButton();
});
formAdd.addEventListener('submit', (el) => submitAdd(el));

function escapeClose(evt) {
  if (evt.key === 'Escape') {
      const popupToClose = document.querySelector('.popup_active');
      closePopup(popupToClose);
  }
}

function overlayXClose() {
  popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close')) {
              formEditValidation.errorCleaner();
              formAddValidation.errorCleaner();
              closePopup(popup);
          }
      })
  })
};
overlayXClose();
const formEditValidation = new FormValidator(config, formEdit);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(config, formAdd);
formAddValidation.enableValidation();
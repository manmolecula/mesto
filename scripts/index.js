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

function createCards(link, title) {
  const newCard = new Card(link, title, cardTemplate, image, caption, popupImg, openPopup);
  return newCard.createCard();
}

function addCard(card) {
  elList.prepend(card);
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', escapeClose);
};
export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', escapeClose);
};

function submitAdd(el) {
  el.preventDefault();
  addCard(createCards(link.value, title.value));
  closePopup(popupAdd);
}

function submitEdit(el) {
  el.preventDefault();
  profileName.textContent = popupName.value;
  profileSub.textContent = subtitle.value;
  closePopup(popupEdit);
}

function openEditForm(){
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  subtitle.value = profileSub.textContent;
  formEditValidation.errorCleaner();
}

function openAddForm(){
  openPopup(popupAdd);
  formAdd.reset();
  formAddValidation.disabledButton();
  formAddValidation.errorCleaner();
}

initialCards.forEach(function(item) {
  addCard(createCards(item.link, item.name));
});
editBtn.addEventListener('click', openEditForm);
formEdit.addEventListener('submit', (el) => submitEdit(el));
addBtn.addEventListener('click', openAddForm);
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
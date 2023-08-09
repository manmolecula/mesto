import './index.css';
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
  popups,
  profileNameValue,
  profileSubValue,
}
from '../utils/const.js';
import {
  FormValidator
}
from '../components/FormValidator.js';
import {
  Card
}
from '../components/Card.js';
import {
  Section
}
from '../components/Section.js';
import {
  Popup
}
from '../components/Popup.js';
import {
  PopupWithImage
}
from '../components/PopupWithImage.js';
import {
  PopupWithForm
}
from '../components/PopupWithForm.js';
import {
  UserInfo
}
from '../components/UserInfo.js';

// const popupEditForm = new PopupWithForm(popupEdit,{
//   submitHandler: (data) => {
//     userInfo.setUserInfo({
//       name: data.name,
//       info: data.info
//     })
//     userInfo.updateUserInfo();
//     popupEditForm.close();
//   }
// });
// console.log(popupEditForm);
// popupEditForm.setEventListeners();
// editBtn.addEventListener('click', () => {
//   const userData = userInfo.getUserInfo();
//   profileNameValue.value = userData.name;
//   profileSubValue.value = userData.info;
//   popupEditForm.open();
// });

const userInfo = new UserInfo({
  name: profileName,
  info: profileSub
});

userInfo.setUserInfo({name: 'Жак-Ив Кусто', info: 'Исследователь океана'});
userInfo.updateUserInfo();

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.link, item.name, cardTemplate, handleCardClick);
    return newCard.createCard();
  }
}, elList);
cardSection.render();

const popupWithImage = new PopupWithImage(popupImg);
popupWithImage.setEventListeners();

function handleCardClick(imgLink, caption){
  popupWithImage.open(imgLink, caption);
}

const popupWithFormEdit = new PopupWithForm(popupEdit, {
  submitHandler: () =>{
    
  }
});

const formEditValidation = new FormValidator(config, formEdit);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(config, formAdd);
formAddValidation.enableValidation();

// function createCards(link, title) {
//   const newCard = new Card(link, title, cardTemplate, popupImg, openPopup);
//   return newCard.createCard();
// }

// function addCard(card) {
//   elList.prepend(card);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_active');
//   document.removeEventListener('keydown', escapeClose);
// };
// export function openPopup(popup) {
//   popup.classList.add('popup_active');
//   document.addEventListener('keydown', escapeClose);
// };

// function submitAdd(el) {
//   el.preventDefault();
//   addCard(createCards(link.value, title.value));
//   closePopup(popupAdd);
// }

// function submitEdit(el) {
//   el.preventDefault();
//   profileName.textContent = popupName.value;
//   profileSub.textContent = subtitle.value;
//   closePopup(popupEdit);
// }

// function openEditForm(){
//   openPopup(popupEdit);
//   popupName.value = profileName.textContent;
//   subtitle.value = profileSub.textContent;
//   formEditValidation.errorCleaner();
// }

// function openAddForm(){
//   openPopup(popupAdd);
//   formAdd.reset();
//   formAddValidation.disabledButton();
//   formAddValidation.errorCleaner();
// }

// initialCards.forEach(function(item) {
//   addCard(createCards(item.link, item.name));
// });

// formEdit.addEventListener('submit', (el) => submitEdit(el));
// addBtn.addEventListener('click', openAddForm);
// formAdd.addEventListener('submit', (el) => submitAdd(el));

// function escapeClose(evt) {
//   if (evt.key === 'Escape') {
//       const popupToClose = document.querySelector('.popup_active');
//       closePopup(popupToClose);
//   }
// }

// function overlayXClose() {
//   popups.forEach((popup) => {
//       popup.addEventListener('mousedown', (evt) => {
//           if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close')) {
//               closePopup(popup);
//           }
//       })
//   })
// };
// overlayXClose();

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
  renderer: (data) => {
    const newCard = new Card(data.link, data.name, cardTemplate, handleCardClick);
    return newCard.createCard();
  }
}, elList);
cardSection.render();

const popupWithImage = new PopupWithImage('#popup-img');
popupWithImage.setEventListeners();

function handleCardClick(imgLink, caption){
  popupWithImage.open(imgLink, caption);
}

const popupWithFormEdit = new PopupWithForm('#popup-edit', {
  formSelector: '#form-edit',
  submitHandler: (data) =>{
    userInfo.setUserInfo({
      name: data.name,
      info: data.info
    });
    userInfo.updateUserInfo();
  }
});
const popupWithFormAdd = new PopupWithForm('#popup-add', {
  formSelector: '#form-add',
  submitHandler: (data) =>{
    const  newCard = new Card(data.link, data.name, cardTemplate, handleCardClick);
    elList.prepend(newCard.createCard());
  }
});

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();

function openEditForm(){
  const userData = userInfo.getUserInfo();
  profileNameValue.value = userData.name;
  profileSubValue.value = userData.info;
  popupWithFormEdit.open();
  formEditValidation.errorCleaner();
}

function openAddForm(){
  popupWithFormAdd.open();
  formAddValidation.disabledButton();
  formAddValidation.errorCleaner();
}

addBtn.addEventListener('click', openAddForm);
editBtn.addEventListener('click', openEditForm);

const formEditValidation = new FormValidator(config, formEdit);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(config, formAdd);
formAddValidation.enableValidation();


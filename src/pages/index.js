import './index.css';
import {
  validationConfig,
  initialCards,
  editBtn,
  addBtn,
  formEdit,
  formAdd,
  profileName,
  profileSub,
  cardTemplate,
  cardsContainer,
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


const userInfo = new UserInfo({
  nameElement: profileName,
  infoElement: profileSub
});

const cardSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const newCard = createCard(data);
    cardSection.addItem(newCard.createCard());
  }
}, cardsContainer);
cardSection.render();

const popupWithImage = new PopupWithImage('#popup-img');
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm('#popup-edit', {
  submitHandler: (data) =>{
    userInfo.setUserInfo({
      name: data.name,
      info: data.info
    });
    popupWithFormEdit.close();
  }
});
const popupWithFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) =>{
    const newCard = createCard(data);
    cardsContainer.prepend(newCard.createCard());
    popupWithFormAdd.close();
  }
});

const formEditValidation = new FormValidator(validationConfig, formEdit);
const formAddValidation = new FormValidator(validationConfig, formAdd);


function createCard(data){
  const  newCard = new Card(data.link, data.name || data.title, cardTemplate, handleCardClick);
  return newCard;
}

function handleCardClick(imgLink, caption){
  popupWithImage.open(imgLink, caption);
}

function openEditForm(){
  const userData = userInfo.getUserInfo();
  profileNameValue.value = userData.nameElement;
  profileSubValue.value = userData.infoElement;
  popupWithFormEdit.open();
  formEditValidation.cleanErrors();
}

function openAddForm(){
  popupWithFormAdd.open();
  formAddValidation.disableButton();
  formAddValidation.cleanErrors();
}

userInfo.setUserInfo({name: 'Жак-Ив Кусто', info: 'Исследователь океана'});

addBtn.addEventListener('click', openAddForm);
editBtn.addEventListener('click', openEditForm);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();

formEditValidation.enableValidation();
formAddValidation.enableValidation();





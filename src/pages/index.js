import './index.css';
import {
  validationConfig,
  editBtn,
  addBtn,
  formEdit,
  formAdd,
  profileName,
  profileSub,
  profileAvatar,
  cardTemplate,
  cardsContainer,
  profileNameValue,
  profileSubValue,
  configApi
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
import {
  Api
}
from '../components/Api.js';
import { PopupWithCardDeleter } from '../components/PopupWithCardDeleter';

const api = new Api(configApi);

let userId = null;

api.getAllInfo()
.then(([userData, postAll])=>{
  userId = userData._id;
  console.log(postAll);
})

const userInfo = new UserInfo({
  nameElement: profileName,
  infoElement: profileSub,
  imageElement: profileAvatar
});

const popupWithImage = new PopupWithImage('#popup-img');
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm('#popup-edit', {
  submitHandler: (data) =>{
    userInfo.setUserInfo({
      name: data.name,
      info: data.info,
      image: data.image ? data.image : profileAvatar.src
    });
    api.editProfile(data);
    popupWithFormEdit.close();
  }
});

const popupWithFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) =>{
    api.postNewCard(data);
    const newCard = createCard(data, cardTemplate);
    cardsContainer.prepend(newCard.createCard());
    popupWithFormAdd.close();
  }
});

const formEditValidation = new FormValidator(validationConfig, formEdit);
const formAddValidation = new FormValidator(validationConfig, formAdd);

const popupConfirm = new PopupWithCardDeleter('#popup-sure', null);
popupConfirm.setEventListeners();


function createCard(data){
  const  newCard = new Card(data.owner ? data.owner._id : userId, data._id ? data._id : null, userId, data.link, data.name || data.title, data.likes ? data.likes.length : 0, cardTemplate, handleCardClick, handleCardDelete);
  return newCard;
}

function handleCardDelete(cardInstance){
  popupConfirm.open();
  popupConfirm.setActionSubmit(()=>{
    api.deleteCard(cardInstance.getId())
    .then(() => {cardInstance.remove(); popupConfirm.close();})
    .catch(err => console.log(err))
  })
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


api.getUserInfo().then((data)=>{
  userInfo.setUserInfo({name: data.name, info: data.about, image: data.avatar});
})
api.getInitialCards().then((data)=>{
  const cardSection = new Section({
    items: data,
    renderer: (data) => {
      const newCard = createCard(data);
      cardSection.addItem(newCard.createCard());
    }
  }, cardsContainer);
  cardSection.render();
})


addBtn.addEventListener('click', openAddForm);
editBtn.addEventListener('click', openEditForm);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();

formEditValidation.enableValidation();
formAddValidation.enableValidation();





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

const cardSection = new Section({
  renderer: (data) => {
    const newCard = createCard(data);
    cardSection.addItem(newCard.createCard());
  }
}, cardsContainer);

const userInfo = new UserInfo({
  nameElement: profileName,
  infoElement: profileSub,
  imageElement: profileAvatar
});

const popupWithImage = new PopupWithImage('#popup-img');
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm('#popup-edit', {
  submitHandler: (data) =>{
    api.editProfile(data).then((dataFromServer) => {
      userInfo.setUserInfo({
        name: dataFromServer.name,
        info: dataFromServer.info,
        image: dataFromServer.image ? dataFromServer.image : profileAvatar.src
      });
    });
    popupWithFormEdit.close();
  }
});

const popupWithFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) =>{
    api.postNewCard(data).then((dataFromServer)=>{
      const newCard = createCard(dataFromServer, cardTemplate);
      cardsContainer.prepend(newCard.createCard());
    });
    popupWithFormAdd.close();
  }
});

const formEditValidation = new FormValidator(validationConfig, formEdit);
const formAddValidation = new FormValidator(validationConfig, formAdd);

const popupConfirm = new PopupWithCardDeleter('#popup-sure', null);
popupConfirm.setEventListeners();


api.getAllInfo()
.then(([userData, postAll])=>{
  userInfo.setUserInfo({name: userData.name, info: userData.about, image: userData.avatar});
  userId = userData._id;
  cardSection.render(postAll);
})


function createCard(data){
  const  newCard = new Card(data, userId, cardTemplate, handleCardClick, handleCardDelete, handleLikePost);
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

function handleLikePost(instance){
  api.changeLike(instance.getId(), instance.isLiked())
  .then((dataCard)=>{
    instance.setLikesData(dataCard)
    console.log(dataCard);
  })
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


addBtn.addEventListener('click', openAddForm);
editBtn.addEventListener('click', openEditForm);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();

formEditValidation.enableValidation();
formAddValidation.enableValidation();





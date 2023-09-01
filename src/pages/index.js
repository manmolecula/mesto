import './index.css';
import {
  validationConfig,
  editBtn,
  addBtn,
  formEdit,
  formAdd,
  formAvatar,
  formEditSubmit,
  formAddSubmit,
  formAvatarSubmit,
  profileName,
  profileSub,
  profileAvatar,
  cardTemplate,
  cardsContainer,
  profileNameValue,
  profileSubValue,
  configApi,
  avatarImg
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
    cardSection.appendItem(newCard);
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
    popupWithFormEdit.renderLoading(true);
    api.editProfile(data)
    .then((dataFromServer) => {
      userInfo.setUserInfo({
        name: dataFromServer.name,
        info: dataFromServer.about,
        image: dataFromServer.image ? dataFromServer.image : profileAvatar.src,
        id: dataFromServer._id
      });
      popupWithFormEdit.close();
    })
    .catch(err => console.log(err))
    .finally(()=>{
      popupWithFormEdit.renderLoading(false);
    });
    
  }
});

const popupWithFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) =>{
    popupWithFormAdd.renderLoading(true);
    api.postNewCard(data)
    .then((dataFromServer)=>{
      const newCard = createCard(dataFromServer, cardTemplate);
      cardSection.prependItem(newCard);
      popupWithFormAdd.close();
    })
    .catch(err => console.log(err))
    .finally(()=>{
      popupWithFormAdd.renderLoading(false);
    })
  }
});

const popupWithFormAvatar = new PopupWithForm('#popup-avatar', {
  submitHandler: (data) =>{
    popupWithFormAvatar.renderLoading(true);
    api.editProfileAvatar(data)
    .then((dataFromServer)=>{
      userInfo.setUserInfo({
        name: dataFromServer.name ? dataFromServer.name : profileName.textContent,
        info: dataFromServer.about ? dataFromServer.about : profileSub.textContent,
        image: dataFromServer.avatar,
        id: dataFromServer._id
      });
      popupWithFormAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(()=>{
      popupWithFormAvatar.renderLoading(false);
    })
  }
});

const formEditValidation = new FormValidator(validationConfig, formEdit);
const formAddValidation = new FormValidator(validationConfig, formAdd);
const formAvatarValidation = new FormValidator(validationConfig, formAvatar);

const popupConfirm = new PopupWithCardDeleter('#popup-sure', null);
popupConfirm.setEventListeners();


api.getAllInfo()
.then(([userData, postAll])=>{
  userInfo.setUserInfo({name: userData.name, info: userData.about, image: userData.avatar});
  userId = userData._id;
  cardSection.render(postAll);
})
.catch(err => console.log(err));


function createCard(data){
  const  newCard = new Card(data, userId, cardTemplate, handleCardClick, handleCardDelete, handleLikePost);
  return newCard.createCard();
}

function handleCardDelete(cardInstance){
  popupConfirm.open();
  popupConfirm.setActionSubmit(()=>{
    api.deleteCard(cardInstance.getId())
    .then(() => {cardInstance.remove(); popupConfirm.close();})
    .catch(err => console.log(err));
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
  .catch(err => console.log(err));
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

function openAvatarForm(){
  popupWithFormAvatar.open();
  formAvatarValidation.disableButton();
  formAvatarValidation.cleanErrors();
}


addBtn.addEventListener('click', openAddForm);
editBtn.addEventListener('click', openEditForm);
avatarImg.addEventListener('click', openAvatarForm);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormAvatar.setEventListeners();

formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();





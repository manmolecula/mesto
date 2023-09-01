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
    const lastText = formEditSubmit.textContent;
    formEditSubmit.textContent = 'Сохранение...';
    api.editProfile(data)
    .then((dataFromServer) => {
      userInfo.setUserInfo({
        name: dataFromServer.name,
        info: dataFromServer.about,
        image: dataFromServer.image ? dataFromServer.image : profileAvatar.src
      });
    })
    .catch(err => console.log(err))
    .finally(()=>{
      formEditSubmit.textContent = lastText;
    });
    popupWithFormEdit.close();
  }
});

const popupWithFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) =>{
    const lastText = formAddSubmit.textContent;
    formAddSubmit.textContent = 'Сохранение...';
    api.postNewCard(data).then((dataFromServer)=>{
      const newCard = createCard(dataFromServer, cardTemplate);
      cardsContainer.prepend(newCard.createCard());
    })
    .catch(err => console.log(err))
    .finally(()=>{
      formAddSubmit.textContent = lastText;
    })
    popupWithFormAdd.close();
  }
});

const popupWithFormAvatar = new PopupWithForm('#popup-avatar', {
  submitHandler: (data) =>{
    const lastText = formAvatarSubmit.textContent;
    formAvatarSubmit.textContent = 'Сохранение...';
    api.editProfileAvatar(data)
    .then((dataFromServer)=>{
      profileAvatar.src = dataFromServer.avatar;
    })
    .catch(err => console.log(err))
    .finally(()=>{
      formAvatarSubmit.textContent = lastText;
    })
    popupWithFormAvatar.close();
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
  .catch(err => console.log(err))
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





const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error'
};
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');
const profileName = document.querySelector('.profile__name');
const profileSub = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.elements__list');
const profileNameValue = document.querySelector('.popup__input_profile_name');
const profileSubValue = document.querySelector('.popup__input_profile_subtitle');
const initialCards = [{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}];
export {
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
  profileSubValue
};
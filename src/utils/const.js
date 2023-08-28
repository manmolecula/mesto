const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error'
};
const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '22283308-ca7c-40b6-866d-8231e5a54dc0',
    'Content-Type': 'application/json'
  }
}
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');
const profileName = document.querySelector('.profile__name');
const profileSub = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.elements__list');
const profileNameValue = document.querySelector('.popup__input_profile_name');
const profileSubValue = document.querySelector('.popup__input_profile_subtitle');
const likeNumber = document.querySelector('elements__like-number');
export {
  configApi,
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
  likeNumber
};
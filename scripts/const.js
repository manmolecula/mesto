const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const closeEdit = document.querySelector('#close-edit');
const closeAdd = document.querySelector('#close-add');
const closeImg = document.querySelector('#close-img');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImg = document.querySelector('#popup-img');
const image = document.querySelector('.popup__img');
const caption = document.querySelector('.popup__caption');
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');
const popupName = document.querySelector('#form-name');
const subtitle = document.querySelector('#form-sub');
const title = document.querySelector('#form-title');
const link = document.querySelector('#form-link');
const profileName = document.querySelector('.profile__name');
const profileSub = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('#card').content;
const cardPlace = card.querySelector('.elements__place');
const elList = document.querySelector('.elements__list');
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  } 
];
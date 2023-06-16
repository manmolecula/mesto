const edit = document.querySelector('.profile__edit-btn');
const add = document.querySelector('.profile__add-btn');
const closeEdit = document.querySelector('#close-edit');
const closeAdd = document.querySelector('#close-add');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');
const popupName = document.querySelector('#form-name');
const subtitle = document.querySelector('#form-sub');
const title = document.querySelector('#form-title');
const link = document.querySelector('#form-link');
const profileName = document.querySelector('.profile__name');
const profileSub = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('#card').content;
const cardImg = card.querySelector('.elements__img');
const cardPlace = card.querySelector('.elements__place');
const elList = document.querySelector('.elements__list');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
for (let i = 0; i < initialCards.length; i++) {
  let card = cardTemplate.querySelector('.elements__el').cloneNode(true);
  card.querySelector('#new-img').src = initialCards[i].link;
  card.querySelector('#new-place').textContent = initialCards[i].name;
  elList.append(card);
}
function cards(){
    let card = cardTemplate.querySelector('.elements__el').cloneNode(true);
    card.querySelector('#new-img').src = title.value;
    card.querySelector('#new-place').textContent = link.value;
    elList.prepend(card);
};
function like(){
  let likeList = document.querySelectorAll('.elements__like'); 
  console.log(likeList);
  likeList.forEach((el)=>{ 
      el.addEventListener('click',()=>{ 
      el.classList.toggle('elements__like_active'); 
      }) 
  }); 
};
like();
function closeForm(){
    popupEdit.classList.remove('popup_active');
    popupAdd.classList.remove('popup_active');
};

edit.addEventListener('click', function openForm(){
    popupEdit.classList.add('popup_active');
    popupName.value = profileName.textContent;
    subtitle.value = profileSub.textContent;
});
closeEdit.addEventListener('click', closeForm);
formEdit.addEventListener('submit', function editForm(evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileSub.textContent = subtitle.value;
    closeForm();
});

add.addEventListener('click', function openForm(){
  popupAdd.classList.add('popup_active');
  title.value = '';
  link.value = '';
});
closeAdd.addEventListener('click', closeForm);
formAdd.addEventListener('submit', function editForm(evt){
  evt.preventDefault();
  cards();
  closeForm();
  like();
});
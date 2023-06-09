function createCard(link, title) {
  const card = cardTemplate.querySelector('.elements__el').cloneNode(true);
    card.querySelector('#new-img').src = link;
    card.querySelector('#new-img').alt = 'Картинка карточки';
    card.querySelector('#new-place').textContent = title;
    addCard(card);
    const likeList = card.querySelector('.elements__like');
    likeList.addEventListener('click',()=>{
      likeList.classList.toggle('elements__like_active');
    });

    const deleteCard = card.querySelector('.elements__trash');
    deleteCard.addEventListener('click',()=>{
      deleteCard.closest('.elements__el').remove(); 
    });

    const openImg = card.querySelector('.elements__img');
    openImg.addEventListener('click',(el)=>{
      openPopup(popupImg);
      image.src = el.target.closest('.elements__img').src;
      caption.textContent = title;
    });
}

function addCard(card){
  elList.prepend(card);
}
function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', escapeClose);
};
function openPopup(popup){
  popup.classList.add('popup_active');
  document.addEventListener('keydown', escapeClose);
};

function submitAdd(el){
  el.preventDefault();
  createCard(link.value, title.value);
  closePopup(popupAdd);
}

function submitEdit(el){
  el.preventDefault();
  profileName.textContent = popupName.value;
  profileSub.textContent = subtitle.value;
  closePopup(popupEdit);
}


initialCards.forEach(function (item){
  createCard(item.link, item.name);
});

editBtn.addEventListener('click', function openForm(){
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  subtitle.value = profileSub.textContent;
});
formEdit.addEventListener('submit', (el) => submitEdit(el));

addBtn.addEventListener('click', function openForm(){
  openPopup(popupAdd);
  formAdd.reset();
  const addSubmitBtn = formAdd.querySelector('.popup__btn');
  disabledButton(addSubmitBtn, config);
});
formAdd.addEventListener('submit', (el) => submitAdd(el));

function escapeClose(evt){
    if(evt.key === 'Escape'){
      const popupToClose = document.querySelector('.popup_active');
      closePopup(popupToClose);
    }
}

function overlayXClose(){
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_active')) {
          closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    })
  })
};
overlayXClose();

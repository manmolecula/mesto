function createCard(link, title) {
  const card = cardTemplate.querySelector('.elements__el').cloneNode(true);
    card.querySelector('#new-img').src = link;
    card.querySelector('#new-img').alt = 'Картинка карточки';
    card.querySelector('#new-place').textContent = title;
    elList.prepend(card);

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

function closePopup(popup){
  popup.classList.remove('popup_active');
};
function openPopup(popup){
  popup.classList.add('popup_active');
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
closeEdit.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', (el) => submitEdit(el));

addBtn.addEventListener('click', function openForm(){
  openPopup(popupAdd);
  formAdd.reset();
});
closeAdd.addEventListener('click', () => closePopup(popupAdd));
formAdd.addEventListener('submit', (el) => submitAdd(el));

closeImg.addEventListener('click', () => closePopup(popupImg));
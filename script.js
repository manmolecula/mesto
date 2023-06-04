let likeList = document.querySelectorAll('.elements__like');
likeList.forEach((el)=>{
    el.addEventListener('click', ()=>{
        console.log(el);
    el.classList.toggle('elements__like_active');
    })
});
let edit = document.querySelector('.profile__editBtn');
let close = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__name');
let subtitle = document.querySelector('.popup__subtitle');
let form = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileSub = document.querySelector('.profile__subtitle');
edit.addEventListener('click', ()=>{
    popup.classList.add('popup_active');
    popupName.value = profileName.textContent;
    subtitle.value = profileSub.textContent;
});
close.addEventListener('click', ()=>{
    popup.classList.remove('popup_active');
});
form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileSub.textContent = subtitle.value;
    popup.classList.remove('popup_active');
});
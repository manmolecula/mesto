let edit = document.querySelector('.profile__edit-btn');
let close = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__input_profile_name');
let subtitle = document.querySelector('.popup__input_profile_subtitle');
let form = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileSub = document.querySelector('.profile__subtitle');
function closeForm(){
    popup.classList.remove('popup_active');
};
edit.addEventListener('click', function openForm(){
    popup.classList.add('popup_active');
    popupName.value = profileName.textContent;
    subtitle.value = profileSub.textContent;
});
close.addEventListener('click', closeForm);
form.addEventListener('submit', function editForm(evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileSub.textContent = subtitle.value;
    closeForm();
});
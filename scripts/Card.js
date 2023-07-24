import {
    openPopup
}
from './index.js'
export class Card {
    constructor(link, title, cardTemplate, image, caption, elList, popupImg) {
        this._link = link;
        this._title = title;
        this._card = cardTemplate.querySelector('.elements__el').cloneNode(true);
        this._likeList = this._card.querySelector('.elements__like');
        this._deleteCard = this._card.querySelector('.elements__trash');
        this._openImg = this._card.querySelector('.elements__img');
        this._image = image;
        this._caption = caption;
        this._elList = elList;
        this._popupImg = popupImg;
    }
    createCard() {
        this._card.querySelector('#new-img').src = this._link;
        this._card.querySelector('#new-img').alt = 'Картинка карточки';
        this._card.querySelector('#new-place').textContent = this._title;
        this._addCard();
        this._likeList.addEventListener('click', () => {
            this._likeList.classList.toggle('elements__like_active');
        });
        this._deleteCard.addEventListener('click', () => {
            this._deleteCard.closest('.elements__el').remove();
        });
        this._openImg.addEventListener('click', (el) => {
            openPopup(this._popupImg);
            this._image.src = el.target.closest('.elements__img').src;
            this._caption.textContent = this._title;
        });
    }
    _addCard() {
        this._elList.prepend(this._card);
    }
}
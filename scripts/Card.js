export class Card {
    constructor(link, title, cardTemplate, image, caption, popupImg, openPopup) {
        this._link = link;
        this._title = title;
        this._card = cardTemplate.querySelector('.elements__el').cloneNode(true);
        this._likeList = this._card.querySelector('.elements__like');
        this._deleteCard = this._card.querySelector('.elements__trash');
        this._openImg = this._card.querySelector('.elements__img');
        this._image = image;
        this._caption = caption;
        this._popupImg = popupImg;
        this._openPopup = openPopup;
    }
    createCard() {
        this._card.querySelector('#new-img').src = this._link;
        this._card.querySelector('#new-img').alt = 'Картинка карточки';
        this._card.querySelector('#new-place').textContent = this._title;

        this._likeList.addEventListener('click', () => {this._likeActiveToggle()});

        this._deleteCard.addEventListener('click', () => {this._cardDelete()});

        this._openImg.addEventListener('click', () => {this._openImgPopup()});

        return this._card;
    }

    _likeActiveToggle() {
        this._likeList.classList.toggle('elements__like_active');
    }

    _cardDelete() {
        this._card.remove();
    }

    _openImgPopup() {
        this._openPopup(this._popupImg);
        this._image.src = this._link;
        this._caption.textContent = this._title;
    }
}
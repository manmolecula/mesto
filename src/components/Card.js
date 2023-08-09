export class Card {
    constructor(link, title, cardTemplate, handleCardClick) {
        this._link = link;
        this._title = title;
        this._card = cardTemplate.querySelector('.elements__el').cloneNode(true);
        this._likeList = this._card.querySelector('.elements__like');
        this._deleteCard = this._card.querySelector('.elements__trash');
        this._openImg = this._card.querySelector('.elements__img');
        this._handleCardClick = handleCardClick;
    }
    createCard() {
        this._card.querySelector('#new-img').src = this._link;
        this._card.querySelector('#new-img').alt = 'Картинка карточки';
        this._card.querySelector('#new-place').textContent = this._title;

        this._likeList.addEventListener('click', () => {this._likeActiveToggle()});

        this._deleteCard.addEventListener('click', () => {this._cardDelete()});

        this._openImg.addEventListener('click', () => {this._handleCardClick(this._link, this._title)});

        return this._card;
    }

    _likeActiveToggle() {
        console.log(this._likeList);
        this._likeList.classList.toggle('elements__like_active');
    }

    _cardDelete() {
        this._card.remove();
    }
}
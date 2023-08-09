export class Card {
    constructor(link, title, cardTemplate, handleCardClick) {
        this._link = link;
        this._title = title;
        this._card = cardTemplate.querySelector('.elements__el').cloneNode(true);
        this._likeButton = this._card.querySelector('.elements__like');
        this._buttonDelete = this._card.querySelector('.elements__trash');
        this._image = this._card.querySelector('.elements__img');
        this._handleCardClick = handleCardClick;
    }
    createCard() {
        this._image.src = this._link;
        this._image.alt = 'Картинка карточки';
        this._card.querySelector('#new-place').textContent = this._title;

        this._likeButton.addEventListener('click', () => {this._toggleLike()});

        this._buttonDelete.addEventListener('click', () => {this._deleteCard()});

        this._image.addEventListener('click', () => {this._handleCardClick(this._link, this._title)});

        return this._card;
    }

    _toggleLike() {
        this._likeButton.classList.toggle('elements__like_active');
    }

    _deleteCard() {
        this._card.remove();
        this._element = null;
    }
}
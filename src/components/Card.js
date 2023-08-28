export class Card {
    constructor(ownerId, cardId, userId, link, title, likesNumber, cardTemplate, handleCardClick, handleCardDelete) {
        this._link = link;
        this._title = title;
        this._card = cardTemplate.querySelector('.elements__el').cloneNode(true);
        this._likeNumber = likesNumber;
        this._likeButton = this._card.querySelector('.elements__like');
        this._buttonDelete = this._card.querySelector('.elements__trash');
        this._image = this._card.querySelector('.elements__img');
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._ownerId = ownerId;
        this._userId = userId;
        this._cardId = cardId;
    }
    createCard() {
        if(this._userId !== this._ownerId){
            this._buttonDelete.remove();
        }
        this._image.src = this._link;
        this._image.alt = 'Картинка карточки';
        this._card.querySelector('.elements__place').textContent = this._title;
        this._card.querySelector('.elements__like-number').textContent = this._likeNumber;

        this._likeButton.addEventListener('click', () => {this._toggleLike()});
        this._buttonDelete.addEventListener('click', () => {this._handleCardDelete(this)});
        this._image.addEventListener('click', () => {this._handleCardClick(this._link, this._title)});

        return this._card;
    }

    _toggleLike() {
        this._likeButton.classList.toggle('elements__like_active');
    }

    remove(){
        this._card.remove();
        this._card = null;
    }

    getId(){
        return this._cardId;
    }

    getData(){
        const {name, _id, iframeLink} = this._card;
        return {name, _id,  iframeLink};
    }
}
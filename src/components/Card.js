export class Card {
    constructor(data, userId, cardTemplate, handleCardClick, handleCardDelete, handleLikePost) {
        this._card = cardTemplate.querySelector('.elements__el').cloneNode(true);

        this._data = data;
        this._link = data.link;
        this._title = data.name;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardId = data._id;
        
        this._likeButton = this._card.querySelector('.elements__like');
        this._likeCounter = this._card.querySelector('.elements__like-number');
        this._buttonDelete = this._card.querySelector('.elements__trash');
        this._image = this._card.querySelector('.elements__img');
        
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikePost = handleLikePost;
    }
    createCard() {
        if(this._userId !== this._ownerId){
            this._buttonDelete.remove();
        }
        this._image.src = this._link;
        this._image.alt = 'Картинка карточки';
        this._card.querySelector('.elements__place').textContent = this._title;
        this._updateLike();
        this._likeButton.addEventListener('click', () => {this._handleLikePost(this)});
        this._buttonDelete.addEventListener('click', () => {this._handleCardDelete(this)});
        this._image.addEventListener('click', () => {this._handleCardClick(this._link, this._title)});

        return this._card;
    }

    isLiked(){
        return this._data.likes.some((item)=>{
            return item._id === this._userId;
        })
    }

    setLikesData(data){
        this._data.likes = data.likes;
        this._updateLike();
    }

    _updateLike(){
        this._likeCounter.textContent = this._data.likes.length;
        if(this.isLiked()){
            this._likeButton.classList.add('elements__like_active');
        } else {
            this._likeButton.classList.remove('elements__like_active');
        }
    }

    remove(){
        this._card.remove();
        this._card = null;
    }

    getId(){
        return this._cardId;
    }
}
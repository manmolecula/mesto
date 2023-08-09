import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._image = document.querySelector('.popup__img');
        this._caption = document.querySelector('.popup__caption');

    }
    open(imgLink, caption){
        super.open();
    
        this._image.src = imgLink;
        this._caption.textContent = caption;
        this._image.alt = 'Название карточки';
    }
}
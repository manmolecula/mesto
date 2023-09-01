import { Popup } from "./Popup.js";
export class PopupWithCardDeleter extends Popup{
    constructor(popupSelector, handleCardSubmit){
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleCardSubmit = handleCardSubmit;
    }

    setActionSubmit(callback){
        this._handleCardSubmit = callback;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._handleCardSubmit();
        });
    }
}
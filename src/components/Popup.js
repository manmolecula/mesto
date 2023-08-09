export class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
    }
    open(){
        this._popupElement.classList.add('popup_active');
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }
    close(){
        this._popupElement.classList.remove('popup_active');
        document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}
export class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
    }
    open(){
        this._popupSelector.classList.add('popup_active');
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }
    close(){
        this._popupSelector.classList.remove('popup_active');
        document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }

    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}
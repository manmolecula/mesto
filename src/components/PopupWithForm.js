import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popupSelector, {submitHandler}){
        super(popupSelector);
        this._submitHandler = submitHandler;
    }
    _getInputValues(){
        this._inputList = super._popupSelector.querySelectorAll('.popup__input');

        // создаём пустой объект
        this._formValues = {};
      
        // добавляем в этот объект значения всех полей
        [...this._inputList].forEach(input => {
          this._formValues[input.name] = input.value;
        });
      
        // возвращаем объект значений
        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        super._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this._getInputValues());
        
            super._popupSelector.close();
          });
        
    }
    close(){
        super._popupSelector.classList.remove('popup_active');
        document.removeEventListener('keydown', super._handleEscClose);
        super._popupSelector.reset();
    }
}
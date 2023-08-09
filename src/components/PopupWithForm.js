import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popupSelector, {formSelector ,submitHandler = null}){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formSelector = formSelector;
        this._formElement = this._popupElement.querySelector('.popup__form');
    }
    _getInputValues(){
        this._inputList = this._formElement.querySelectorAll('.popup__input');

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
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this._getInputValues());
        
            this.close();
          });
        
    }
    close(){
        this._popupElement.classList.remove('popup_active');
        document.removeEventListener('keydown', super._handleEscClose);
        this._formElement.reset();
    }
}
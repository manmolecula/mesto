import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
    constructor(popupSelector, {submitHandler = null}){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        this._submitBtn = this._formElement.querySelector('.popup__btn');
        this._submitBtnText = this._submitBtn.textContent;
    }
    _getInputValues(){
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
        
          });
        
    }
    close(){
        super.close();
        this._formElement.reset();
    }

    renderLoading(isLoading, loadingText='Сохранение...'){
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
          } else {
            this._submitBtn.textContent = this._submitBtnText;
        }
    }
}
export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._formElement = formElement;
        this._inputList = formElement.querySelectorAll(this._inputSelector);
        this._submitButtonElement = formElement.querySelector(this._submitButtonSelector);
    }
    errorCleaner() {
        this._inputList.forEach((inputEl) => {
            const errorElement = this._formElement.querySelector(`#${inputEl.name}-error`);
            this._hideError(inputEl, errorElement);
        });
    }
    enableValidation() {
        this._setEventListener();
    }
    _setEventListener() {
        this._toggleButtonState(this._formElement.checkValidity());
        [...this._inputList].forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._formElement.checkValidity());
            })
        })
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (!this._formElement.checkValidity()) return;
            console.log('Форма отправлена!');
        })
    }
    _toggleButtonState(isActive) {
        if (!isActive) {
            this.disabledButton();
        } else {
            this.enableButton();
        }
    }
    disabledButton() {
        this._submitButtonElement.disabled = 'disabled';
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }
    enableButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }
    _checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        if (!isInputValid) {
            this._showError(inputElement, errorElement);
        } else {
            this._hideError(inputElement, errorElement);
        }
    }
    _showError(inputElement, errorElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }
    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }
}
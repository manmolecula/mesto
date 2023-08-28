export class UserInfo{
    constructor({nameElement, infoElement, imageElement}){
        this._name = null;
        this._info = null;
        this._image = null;
        this._nameElement = nameElement;
        this._infoElement = infoElement;
        this._imageElement = imageElement;
    }
    getUserInfo(){
        return {
            nameElement:this._name, 
            infoElement:this._info,
        }
    }
    setUserInfo(userInfo){
        this._name = userInfo.name;
        this._info = userInfo.info;
        this._image = userInfo.image;
        this.updateUserInfo();
    }
    updateUserInfo(){
        this._nameElement.textContent = this._name;
        this._infoElement.textContent = this._info;
        this._imageElement.src = this._image;
    }
}
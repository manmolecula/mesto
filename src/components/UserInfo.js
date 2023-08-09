export class UserInfo{
    constructor({nameElement, infoElement}){
        this._name = null;
        this._info = null;
        this._nameElement = nameElement;
        this._infoElement = infoElement;
    }
    getUserInfo(){
        return {
            nameElement:this._name, 
            infoElement:this._info
        }
    }
    setUserInfo(userInfo){
        this._name = userInfo.name;
        this._info = userInfo.info;
        this.updateUserInfo();
    }
    updateUserInfo(){
        this._nameElement.textContent = this._name;
        this._infoElement.textContent = this._info;
    }
}
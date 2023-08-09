export class UserInfo{
    constructor({name, info}){
        this._name = null;
        this._info = null;
        this._nameElement = name;
        this._infoElement = info;
    }
    getUserInfo(){
        return {
            name:this._name, 
            info:this._info
        }
    }
    setUserInfo(userInfo){
        this._name = userInfo.name;
        this._info = userInfo.info;
    }
    updateUserInfo(){
        this._nameElement.textContent = this._name;
        this._infoElement.textContent = this._info;
    }
}
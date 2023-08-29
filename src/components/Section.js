export class Section{
    constructor({renderer}, container){
        this._renderer = renderer;
        this._container = container;
    }
    render(items){
        items.forEach(item => {
            this._renderer(item);
        });
    }
    addItem(element){
        this._container.append(element);
    }
}
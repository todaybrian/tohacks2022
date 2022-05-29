class Node {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this._color = 'red';
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
        this.elemColor.setAttribute('style', `background-color: ${color}`);
    }

    createElem() {
        let elem = document.createElement('div');

        elem.setAttribute('class', 'node')
        elem.setAttribute('id', `node${this.id}`);
        elem.style.left = `${this.x}px`;
        elem.style.top = `${this.y}px`;

        let drag = document.createElement('div');
        drag.setAttribute('class', 'node_header');
        drag.setAttribute('id', `node${this.id}_drag`);
        drag.innerText = `node ${this.id}`;
        elem.appendChild(drag);

        document.getElementById("nodes").appendChild(elem);
        return elem;
    }

    get elem() {
        let elem = document.getElementById(`node${this.id}`);
        if (!elem) {
            elem = this.createElem();
        }
        return elem;
    }

    get elemDrag() {
        return document.getElementById(`node${this.id}_drag`);
    }

    get elemColor() {
        return document.getElementById(`node${this.id}_color`);
    }

    get midX() {
        return this.elem.offsetLeft + this.elem.offsetWidth/2;
    }
    
    get midY() {
        return this.elem.offsetTop + this.elem.offsetHeight/2;
    }
}

class Node {
    constructor(id, x, y, state) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.state = state;
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
        let elemDrag = document.getElementById(`node${this.id}_drag`);
        if (!elemDrag)  {
            elemDrag = this.createElem();
        }
        return elemDrag;
    }

    get elemState() {
        return this.state;
    }

    get midX() {
        return this.elem.offsetLeft + this.elem.offsetWidth/2;
    }
    
    get midY() {
        return this.elem.offsetTop + this.elem.offsetHeight/2;
    }
}

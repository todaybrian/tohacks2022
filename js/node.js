class Node {
    constructor(id, x, y, state, displayText, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.state = state;
        this._color = color;
        this.isContextMenued = false;
        this._displayText = displayText;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
        if (color === 'none') {
            console.log(color);
            this.elemColor.setAttribute('style', 'display:none');
        } else {
            this.elemColor.setAttribute('style', `background-color: ${color}`);
        }
    }

    get displayText() {
        return this._displayText ;
    }

    set displayText(displayText) {
        this._displayText = displayText;
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
        drag.innerText = this._displayText;
        elem.appendChild(drag);

        let color = document.createElement('div');
        color.setAttribute('class', 'node_color');
        color.setAttribute('id', `node${this.id}_color`);

        color.onclick = () => {
            let picker = document.getElementById('color_picker');
            picker.setAttribute('styles', 'display: inline');
        }

        elem.appendChild(color);

        elem.onmouseover = () => {
            if (this.color === 'none') {
                this.elemColor.setAttribute('style', `background-color: white`);
            }
        }

        elem.onmouseout = () => {
            if (this.color === 'none') {
                this.elemColor.setAttribute('style', `display: none`);
            }
        }

        document.getElementById("nodes").appendChild(elem);
        this.color = this._color;
        return elem;
    }

    removeElem() {
        this.elem.remove();
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

    get elemState() {
        return this.state;
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

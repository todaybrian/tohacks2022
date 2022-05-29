class Node {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    get elem() {
        let elem = document.getElementById(`node${this.id}`);
        if (!elem) {
            // create elem
        }
        return elem;
    }

    get elemDrag() {
        let elem = document.getElementById
    }

    get midX() {
        return this.elem.offsetLeft + this.elem.offsetWidth/2;
    }
    
    get midY() {
        return this.elem.offsetTop + this.elem.offsetHeight/2;
    }
}

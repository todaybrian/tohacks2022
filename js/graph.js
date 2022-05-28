class AdjList {
    constructor() {
        this.list = {};
    }

    get(u) {
        if (!(u in this.list)) {
            this.list[u] = [];
        }
        return this.list[u];
    }

    addEdge(u, v) {
        // add directed edge u -> v
        this.get(u).push(v);
    }
}

class Node {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    get elem() {
        let elem = document.getElementById(`node${this.id}`);
        console.log(`node${this.id}`);
        if (!elem) {
            // create elem
        }
        return elem;
    }

    get midX() {
        return this.elem.offsetLeft + this.elem.offsetWidth/2;
    }
    
    get midY() {
        return this.elem.offsetTop + this.elem.offsetHeight/2;
    }
}

class Graph {
    constructor() {
        this.adjList = new AdjList();
        this.nodes = {};
    }

    onNodeDrag(node) {
        // called when node is dragged
        console.log(node);
        let lineElem = getEdgeLine(1, 2);
        setEdgeLinePoints(lineElem, 0, 0, node.midX, node.midY);
    }

    makeNodeDraggable(node) {
        let self = this;
        let elem = node.elem;

        function onDrag(e) {
            e.preventDefault();
            
            let dx = node.x - e.clientX;
            let dy = node.y - e.clientY;

            node.x = e.clientX;
            node.y = e.clientY;

            elem.style.left = `${elem.offsetLeft - dx}px`;
            elem.style.top = `${elem.offsetTop - dy}px`;

            self.onNodeDrag(node);
        }

        function stopDrag() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        function onMouseDown(e) {
            e.preventDefault();

            node.x = e.clientX;
            node.y = e.clientY;

            document.onmousemove = onDrag;
            document.onmouseup = stopDrag
        }

        (document.getElementById(elem.id + "_drag") || elem).onmousedown = onMouseDown;
    }

    addNode(id, x=0, y=0) {
        this.nodes[id] = new Node(id, x, y);
        this.makeNodeDraggable(this.nodes[id]);
    }

}


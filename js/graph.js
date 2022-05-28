class Graph {
    constructor() {
        this.adjList = new AdjList();
        this.nodes = {};
    }

    addEdge(node1Id, node2Id) {
        // adds directed edge u -> v
        this.adjList.addEdge(node1Id, node2Id);
    }

    addNode(id, x=0, y=0) {
        this.nodes[id] = new Node(id, x, y);
        this.makeNodeDraggable(this.nodes[id]);
    }

    getNode(id) {
        return this.nodes[id];
    }

    onNodeDrag(node) {
        // called when a node is dragged
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
}


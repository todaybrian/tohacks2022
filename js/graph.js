window.addNodeLocX = 300;
window.addNodeLocY = 300;

class Graph {
    constructor() {
        this.parents = new AdjList();
        this.children = new AdjList();
        this.nodes = {};
        this.index = 7;

        this.nodesSize = 0;

        this.addingEdge = false;
        this.RemovingEdge = false;
        this.updateEdgeParent = 0;
        this.updateEdgeChild = 0;

        addContextMenu(
            document.getElementById('nodes'),
            [
                new Button('Add task', (e) => {
                    window.addNodeLocX = e.pageX;
                    window.addNodeLocY = e.pageY;
                    //this.addNode(this.index++, e.pageX, e.pageY);
                    window.document.body.__x.$data.open_add_node = true;
                })
            ]
        );
    }

    addEdge(node1Id, node2Id) {
        // adds directed edge node1Id -> node2Id
        this.children.addEdge(node1Id, node2Id);
        this.parents.addEdge(node2Id, node1Id);

        // update edge lines
        let lineElem = getEdgeLine(node1Id, node2Id);

        let node1 = this.getNode(node1Id), node2 = this.getNode(node2Id);
        setEdgeLinePoints(lineElem, node1.midX, node1.midY, node2.midX, node2.midY);
    }

    removeEdge(node1Id, node2Id) {
        // removes directed edge node1Id -> node2Id
        this.children.removeEdge(node1Id, node2Id);
        this.parents.removeEdge(node2Id, node1Id);

        // remove edge line
        let lineElem = getEdgeLine(node1Id, node2Id);
        lineElem.remove();
    }

    addNode(id, x = 300, y = 300, state = false, displayName = "Node " + id, color = 'none') {
        this.nodesSize++;

        this.nodes[id] = new Node(id, x, y, state, displayName, color);
        this.makeNodeDraggable(this.nodes[id]);
        this.addNodeContextMenu(this.nodes[id]);
    }

    getNode(id) {
        return this.nodes[id];
    }

    removeNode(id) {
        this.nodesSize--;
        // remove all adjacent edges
        let parents = new Set(this.parents.get(id));
        let children = new Set(this.children.get(id));

        for (const parent of parents) {
            this.removeEdge(parent, id);
        }

        for (const child of children) {
            this.removeEdge(id, child);
        }

        this.nodes[id].removeElem();
        delete this.nodes[id];
    }

    addNodeContextMenu(node) {
        addContextMenu(
            node.elemDrag,
            [
                new Button('Add connection', () => {
                    console.log('add connection');
                    this.addingEdge = true;

                    let selectNode = (id) => {
                        console.log(`selected ${id}`);
                        this.addEdge(node.id, id);
                        this.addAllNodesClick();
                        this.addingEdge = false;
                    }

                    this.removeAllNodesClick();

                    for (const [key, val] of Object.entries(this.nodes)) {
                        if (val.id == node.id || this.children.get(node.id).has(val.id)
                            || this.edgeCreatesCycle(node.id, val.id)) {
                            continue;
                        }
                        val.elemDrag.style.cursor = 'pointer';
                        val.elemDrag.style.textDecoration = 'underline';
                        val.elemDrag.onmousedown = (e) => {
                            selectNode(val.id);
                        }
                    }

                }, () => this.children.get(node.id).size < this.nodesSize - 1),

                new Button('Remove connection', () => {
                    console.log('remove connection');
                    this.removingEdge = true;

                    let selectNode = (id) => {
                        console.log(`selected ${id}`);
                        this.removeEdge(node.id, id);
                        this.removeEdge(id, node.id);
                        this.addAllNodesClick();
                        this.removingEdge = false;
                    }

                    this.removeAllNodesClick();

                    for (const [key, val] of Object.entries(this.nodes)) {
                        if (!this.children.get(node.id).has(val.id)
                            && !this.parents.get(node.id).has(val.id)) {
                            continue;
                        }
                        val.elemDrag.style.cursor = 'pointer';
                        val.elemDrag.style.textDecoration = 'underline';
                        val.elemDrag.onmousedown = (e) => {
                            selectNode(val.id);
                        }
                    }


                }, () => this.children.get(node.id).size || this.parents.get(node.id).size),

                new Button(() => (node.elemState ? 'Mark as incomplete' : 'Mark as done'), () => {
                    node.state = !node.state;
                    //node.elemDrag.setAttribute('style', `background-color: rgba(57, 182, 190, ${(0.4 - (node.elemState ? 0.2 : 0))})`);
                    console.log('done button');
                }),

                new Button('Edit', () => {
                    let new_text = prompt('Enter new text:', node.displayText);
                    if (new_text != null) {
                        node.displayText = new_text;
                        node.elemDrag.innerText = new_text;
                        g.onNodeDrag(node);
                        console.log('edit button');
                    }
                }),

                new Button('Delete', () => {
                    this.removeNode(node.id);
                })
            ],
            () => { node.isContextMenued = true },
            () => { node.isContextMenued = false }
        );
    }

    onNodeDrag(node) {
        // called when a node is dragged

        // update edge lines
        for (const childId of this.children.get(node.id)) {
            let child = this.getNode(childId);

            let lineElem = getEdgeLine(node.id, child.id);
            setEdgeLinePoints(lineElem, node.midX, node.midY, child.midX, child.midY);
        }

        for (const parentId of this.parents.get(node.id)) {
            let parent = this.getNode(parentId);

            let lineElem = getEdgeLine(parent.id, node.id);
            setEdgeLinePoints(lineElem, parent.midX, parent.midY, node.midX, node.midY);
        }
    }

    addAllNodesClick() {
        // re-adds dragging and context menu to all nodes
        for (const [key, node] of Object.entries(this.nodes)) {
            this.makeNodeDraggable(node);
            this.addNodeContextMenu(node);
        }
    }

    removeAllNodesClick() {
        for (const [key, node] of Object.entries(this.nodes)) {
            this.removeNodeClick(node);
        }
    }

    removeNodeClick(node) {
        // removes dragging and context menu from node
        (node.elemDrag || node.elem).style.cursor = 'not-allowed';
        (node.elemDrag || node.elem).onmousedown = (e) => e.preventDefault();

        node.elemDrag.oncontextmenu = (e) => e.preventDefault();
    }

    makeNodeDraggable(node) {
        let self = this;
        let elem = node.elem;
        let elemDrag = node.elemDrag;

        function onDrag(e) {
            e.preventDefault();

            if (node.isContextMenued || self.addingNode || self.removingNode) {
                return;
            }

            let dx = node.x - e.clientX;
            let dy = node.y - e.clientY;

            node.x = e.clientX;
            node.y = e.clientY;

            elem.style.left = `${elem.offsetLeft - dx}px`;
            elem.style.top = `${elem.offsetTop - dy}px`;
            //elemDrag.setAttribute('style', 'background-color: rgba(57, 182, 190, 0.6)');
            self.onNodeDrag(node);
        }

        function stopDrag() {
            document.onmouseup = null;
            document.onmousemove = null;
            //elemDrag.setAttribute('style', `background-color: rgba(57, 182, 190, ${(0.4 - (node.elemState ? 0.2 : 0))})`);
        }

        function onMouseDown(e) {
            e.preventDefault();

            if (node.isContextMenued || self.addingNode || self.removingNode) {
                return;
            }

            node.x = e.clientX;
            node.y = e.clientY;

            document.onmousemove = onDrag;
            document.onmouseup = stopDrag;
        }

        (elemDrag || elem).style.cursor = 'pointer';
        (elemDrag || elem).style.textDecoration = 'none';
        (elemDrag || elem).onmousedown = onMouseDown;
    }

    arrangeAsTree() {
        let len = Object.keys(this.nodes).length;
        let arr = Array.from(Array(len));
        let num = Array.from(Array(len));
        let lvl = 1;
        let q = new Queue();
        // for each node we should record how many parents they have
        for (let i = 0; i < len; ++i) {
            num[i] = this.parent.get(i).length;
            if (num[i] === 0) {
                arr[i] = 1;
                q.enqueue(i);
            }
        }
        // go through and assign levels to children, removing edges in the process
        while (!q.isEmpty()) {
            let u = q.dequeue();
            this.child.get(u).forEach(v => {
                arr[v] = arr[u] + 1;
                --num[v];
                if (num[v] == 0) {
                    q.enqueue(v);
                }
            });
        }
        // now we know the levels, so we should sort the nodes based on the levels
    }

    edgeCreatesCycle(u, v) {
        // returns true if adding edge u -> v creates a cycle

        // to be implemented
        return false;
    }
}


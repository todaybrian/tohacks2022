class Graph {
    constructor() {
        this.parents = new AdjList();
        this.children = new AdjList();
        this.nodes = {};
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
    addNodeContextMenu(node) {
        node.elem.oncontextmenu = (e) => {
            node.isContextMenued = true;
            e.preventDefault();

            let ctxMenu = document.createElement('div');
            ctxMenu.setAttribute('id', 'context_menu');
            ctxMenu.style.left = `${e.pageX}px`;
            ctxMenu.style.top = `${e.pageY}px`;

            function exitMenu() {
                ctxMenu.remove();
                ctxExit.style.display = 'none';
                node.isContextMenued = false;
            }

            function btnFunc(func) {
                return () => {
                    func();
                    exitMenu();
                }
            }

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = "Delete";
            deleteBtn.onclick = btnFunc(() => {
                console.log('delete button clicked');
            });
            ctxMenu.appendChild(deleteBtn);

            let doneBtn = document.createElement('button');
            doneBtn.innerText = "Mark as done";
            doneBtn.onclick = btnFunc(() => {
                console.log('done button clicked');
            });
            ctxMenu.appendChild(doneBtn);

            let ctxExit = document.getElementById("context_menu_exit");
            ctxExit.style.display = 'inline';

            ctxExit.onclick = exitMenu;

            document.body.appendChild(ctxMenu);
        }
    }

    addNode(id, x=300, y=300, state=false) {
        this.nodes[id] = new Node(id, x, y);
        this.makeNodeDraggable(this.nodes[id]);
        this.addNodeContextMenu(this.nodes[id]);
    }

    getNode(id) {
        return this.nodes[id];
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
        console.log(`node${node.id}_drag`);
    }

    makeNodeDraggable(node) {
        let self = this;
        let elem = node.elem;
        let elemDrag = node.elemDrag;
        let elemState = node.elemState;

        function onDrag(e) {
            e.preventDefault();

            if (node.isContextMenued) {
                stopDrag();
                return;
            }
            
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

            if (node.isContextMenued) {
                return;
            }

            node.x = e.clientX;
            node.y = e.clientY;

            document.onmousemove = onDrag;
            document.onmouseup = stopDrag;
            elemState = !elemState;
            if (elemState)  {
                elemDrag.style.backgroundColor = 'rgba(57, 182, 190, 0.2)';
            } else  {
                elemDrag.style.backgroundColor = 'white';
            }
        }

        (elemDrag || elem).onmousedown = onMouseDown;
    }
}


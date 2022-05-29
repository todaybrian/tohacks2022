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

        this._selectedNode = -1;

        addContextMenu(
            document.getElementById('nodes'),
            [
                new Button('Add task', (e) => {
                    //window.addNodeLocX = e.pageX;
                    //window.addNodeLocY = e.pageY;
                    ////this.addNode(this.index++, e.pageX, e.pageY);
                    //window.document.body.__x.$data.open_add_node = true;

                    //let listener = (event) => {
                        //event.preventDefault();
                        //let text = event.target.text.value;
                        //let color = event.target.color.value;
                        //console.log(text);
                        //this.addNode(-1, window.addNodeLocX, window.addNodeLocY, false, text, color);
                        //event.target.text.value = "";
                        //window.addNodeLocX = 300;
                        //window.addNodeLocY = 300;

                        ////document.getElementById('add_node_form').removeEventListener('submit', listener);
                    //}


                    //document.getElementById('add_node_form').addEventListener('submit', listener);
                    this.promptAddNode(e.pageX, e.pageY);
                }),
                new Button('Add dependent task', (e) => {
                    this.promptAddNode(e.pageX, e.pageY, '', this.selectedNode);

                }, () => this.selectedNode != -1)
            ]
        );

        document.getElementById('nodes').onmousedown = (e) => {
            if (e.buttons == 2 || e.target.id !== 'nodes') {
                return;
            }

            this.selectedNode = -1;
        }
    }

    promptAddNode(x = 400, y = 400, initialText = '', dependencyNode = undefined,
            editNode = undefined) {
        const colors = ['#a873ff', '#697afa', '#fc7c7c', '#ffea73', '#9cff8f'];
        const bgs = ['#d5bdfc', '#dee2ff', '#ffdede', '#fcf3bb', '#e2ffde'];

        let textarea = document.getElementById('add-node-textarea');
        textarea.value = initialText;

        if (typeof editNode !== 'undefined') {
            let node = this.getNode(editNode);
            textarea.style.backgroundColor = node.color;
        } else {
            textarea.style.backgroundColor = bgs[0];
        }

        for (let i = 0; i < 5; i++) {
            let btn = document.getElementById(`color-btn${i}`);
            btn.style.backgroundColor = colors[i];
            btn.onclick = () => {
                textarea.style.backgroundColor = bgs[i];
            }
        }

        document.getElementById('add-node-submit').onclick = () => {
            if (textarea.value === '') {
                textarea.value = 'Task';
            }
            if (typeof editNode !== 'undefined') {
                let node = this.getNode(editNode);
                node.displayText = textarea.value;
                node.color = textarea.style.backgroundColor
            } else {
                this.addNode(-1, x, y, false, textarea.value,
                        textarea.style.backgroundColor);
            }
            if (typeof dependencyNode !== 'undefined') {
                this.addEdge(dependencyNode, this.index);
            }
            document.getElementById('add-node').style.display = 'none';
        }

        document.getElementById('add-node-cancel').onclick = () => {
            document.getElementById('add-node').style.display = 'none';
        }

        document.getElementById('add-node').style.display = 'inline';

        textarea.focus();
    }

    get selectedNode() {
        return this._selectedNode;
    }

    set selectedNode(id) {
        if (this.selectedNode in this.nodes) {
            this.nodes[this.selectedNode].elem.classList.remove("node_selected");
        }
        if (id in this.nodes) {
            this.nodes[id].elem.classList.add("node_selected");
        }
        this._selectedNode = id;
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

        if (id == -1) {
            id = ++this.index;
        }

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
                new Button('Connect', () => {
                    console.log('add connection');

                    this.addEdge(this.selectedNode, node.id);

                    //this.addingEdge = true;

                    //let selectNode = (id) => {
                        //console.log(`selected ${id}`);
                        //this.addEdge(node.id, id);
                        //this.addAllNodesClick();
                        //this.addingEdge = false;
                    //}

                    //this.removeAllNodesClick();

                    //for (const [key, val] of Object.entries(this.nodes)) {
                        //if (val.id == node.id || this.children.get(node.id).has(val.id)
                            //|| this.edgeCreatesCycle(node.id, val.id)) {
                            //continue;
                        //}
                        //val.elemDrag.style.cursor = 'pointer';
                        //val.elemDrag.style.textDecoration = 'underline';
                        //val.elemDrag.onmousedown = (e) => {
                            //selectNode(val.id);
                        //}
                    //}

                }, () => this.children.get(node.id).size < this.nodesSize - 1
                        && this.selectedNode != -1 && node.id != this.selectedNode
                        && !this.children.get(this.selectedNode).has(node.id)
                        && !this.edgeCreatesCycle(this.selectedNode, node.id)),

                new Button('Disconnect', () => {
                    console.log('remove connection');

                    this.removeEdge(this.selectedNode, node.id);
                    this.removeEdge(node.id, this.selectedNode);

                    //this.removingEdge = true;

                    //let selectNode = (id) => {
                        //console.log(`selected ${id}`);
                        //this.removeEdge(node.id, id);
                        //this.removeEdge(id, node.id);
                        //this.addAllNodesClick();
                        //this.removingEdge = false;
                    //}

                    //this.removeAllNodesClick();

                    //for (const [key, val] of Object.entries(this.nodes)) {
                        //if (!this.children.get(node.id).has(val.id)
                            //&& !this.parents.get(node.id).has(val.id)) {
                            //continue;
                        //}
                        //val.elemDrag.style.cursor = 'pointer';
                        //val.elemDrag.style.textDecoration = 'underline';
                        //val.elemDrag.onmousedown = (e) => {
                            //selectNode(val.id);
                        //}
                    //}


                }, () => this.selectedNode != -1
                        && (this.parents.get(this.selectedNode).has(node.id)
                        || this.children.get(this.selectedNode).has(node.id))
                        && node.id != this.selectedNode),

                new Button(() => (node.isDone ? 'Mark as incomplete' : 'Mark as done'), () => {
                    node.isDone = !node.isDone;
                    //node.elemDrag.setAttribute('style', `background-color: rgba(57, 182, 190, ${(0.4 - (node.elemState ? 0.2 : 0))})`);
                    console.log('done button');
                }),

                new Button('Edit', () => {
                    //let new_text = prompt('Enter new text:', node.displayText);
                    //if (new_text != null) {
                        //node.displayText = new_text;
                        //node.elemDrag.innerText = new_text;
                        //g.onNodeDrag(node);
                        //console.log('edit button');
                    //}
                    this.promptAddNode(0, 0, node.displayText, undefined, node.id);
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

    //addAllNodesClick() {
        //// re-adds dragging and context menu to all nodes
        //for (const [key, node] of Object.entries(this.nodes)) {
            //this.makeNodeDraggable(node);
            //this.addNodeContextMenu(node);
        //}
    //}

    //removeAllNodesClick() {
        //for (const [key, node] of Object.entries(this.nodes)) {
            //this.removeNodeClick(node);
        //}
    //}

    //removeNodeClick(node) {
        //// removes dragging and context menu from node
        //(node.elemDrag || node.elem).style.cursor = 'not-allowed';
        //(node.elemDrag || node.elem).onmousedown = (e) => e.preventDefault();

        //node.elemDrag.oncontextmenu = (e) => e.preventDefault();
    //}

    makeNodeDraggable(node) {
        let self = this;
        let elem = node.elem;
        let elemDrag = node.elemDrag;

        let onDrag = (e) => {
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

        let onMouseDown = (e) => {
            e.preventDefault();
            if (e.buttons === 2) {
                return;
            }

            if (node.isContextMenued || self.addingNode || self.removingNode) {
                return;
            }

            node.x = e.clientX;
            node.y = e.clientY;

            document.onmousemove = onDrag;
            document.onmouseup = stopDrag;

            this.selectedNode = node.id;
        }

        (elemDrag || elem).style.cursor = 'pointer';
        (elemDrag || elem).style.textDecoration = 'none';
        (elemDrag || elem).onmousedown = onMouseDown;
    }
    /*
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
    }*/

    edgeCreatesCycle(u, v) {
        // returns true if adding edge u -> v creates a cycle
        // add edge, use top sort to detect cycles, and if present then remove it
        this.children.addEdge(u, v);
        this.parents.addEdge(v, u);
        var adj = this.children;
        var n = this.nodesSize;
        var topsort = [];
        var stk = [];
        var vis = Array(n).fill(false);
        // dfs for topsort
        function dfs(node)  {
            vis[node] = true;
            adj.get(node).forEach(i =>   {
                if (vis[i] == false)
                    dfs(i);
            });
            stk.push(node);
        }
        function isCyclic() {
            // use stack to construct topological order
            var pos = new Map();
            var ind = 0;
            while (stk.length > 0)    {
                pos.set(stk[stk.length-1], ind++);
                topsort.push(stk[stk.length-1]);
                stk.pop();
            }
            // check if ordering is valid 
            // if invalid, then topological sort failed, (there is a cycle)
            var cyclic = false;
            for (var i = 0; i < n; i++)    {
                adj.get(i).forEach(j =>   {
                    if ((pos.has(i)?pos.get(i):0) > (pos.has(j)?pos.get(j):0))  {
                        cyclic = true;
                    }
                })
            }
            return cyclic;
        }
        for (var i = 0; i < n; i++)    {
            if (vis[i] == false)    {
                dfs(i);
            }
        }
        if (isCyclic()) {
            this.children.removeEdge(u, v);
            this.parents.removeEdge(v, u);
            return true;
        } else  return false;
    }
}


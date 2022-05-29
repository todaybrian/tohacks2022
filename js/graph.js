class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
  }
  
  /*let q = new Queue();
  for (let i = 1; i <= 7; i++) {
    q.enqueue(i);
  }
  // get the current item at the front of the queue
  console.log(q.peek()); // 1
  
  // get the current length of queue
  console.log(q.length); // 7
  
  // dequeue all elements
  while (!q.isEmpty) {
    console.log(q.dequeue());
  }
}*/
class Graph {
    constructor() {
        this.parents = new AdjList();
        this.children = new AdjList();
        this.nodes = {};
        this.index = 7;
        
        addContextMenu(
            document.getElementById('nodes'),
            [
                new Button('Add task', (e) => {
                    this.addNode(this.index, e.pageX, e.pageY);
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
    
    addNode(id, x=300, y=300, state=false) {
        this.nodes[id] = new Node(id, x, y, state, "Node " + id);
        this.makeNodeDraggable(this.nodes[id]);
        this.addNodeContextMenu(this.nodes[id]);
    }

    getNode(id) {
        return this.nodes[id];
    }

    removeNode(id) {
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
                new Button(() => (node.elemState ? 'Mark as not done' : 'Mark as done'), () => {
                    node.state = !node.state;
                    node.elemDrag.setAttribute('style', `background-color: rgba(57, 182, 190, ${(0.4 - (node.elemState ? 0.2 : 0))})`);
                    console.log('done button');
                }),
                new Button('Edit', () => {
                    let new_text = prompt('Enter new text:', node.displayText);
                    node.displayText = new_text;
                    node.elemDrag.innerText = new_text;
                    console.log('edit button');
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

    makeNodeDraggable(node) {
        let self = this;
        let elem = node.elem;
        let elemDrag = node.elemDrag;

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
            elemDrag.setAttribute('style', 'background-color: rgba(57, 182, 190, 0.6)');
            self.onNodeDrag(node);
        }

        function stopDrag() {
            document.onmouseup = null;
            document.onmousemove = null;
            elemDrag.setAttribute('style', `background-color: rgba(57, 182, 190, ${(0.4 - (node.elemState ? 0.2 : 0))})`);
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
        }

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
}


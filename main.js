let svgElem = document.getElementById("svg");

function getLine(id) {
    // Gets line; if not exists, creates and adds line to svg
    let lineElem = document.getElementById(id);
    if (!lineElem) {
        lineElem = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        lineElem.setAttribute('id', id);
        lineElem.setAttribute('class', 'edge');
        svgElem.appendChild(lineElem);
    }
    return lineElem;
}

function getEdgeLine(node1Id, node2Id) {
    // Gets the line that represents the edge node1Id -> node2Id
    return getLine(`edge${node1Id}_${node2Id}`);
}

function setEdgeLinePoints(lineElem, x1, y1, x2, y2) {
    lineElem.setAttribute('points', `${x1},${y1} ${(x1+x2)/2},${(y1+y2)/2} ${x2},${y2}`);
}

function makeDraggable(elem) {
    let dx = 0, dy = 0, x = 0, y = 0;

    function onMouseMove(e) {
        e.preventDefault();

        dx = x - e.clientX;
        dy = y - e.clientY;

        x = e.clientX;
        y = e.clientY;

        elem.style.left = `${elem.offsetLeft - dx}px`;
        elem.style.top = `${elem.offsetTop - dy}px`;

        let lineElem = getEdgeLine(1, 2);
        setEdgeLinePoints(lineElem, 0, 0, elem.offsetLeft-dx, elem.offsetTop-dy);
    }
    
    function stopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function onMouseDown(e) {
        e.preventDefault();

        x = e.clientX;
        y = e.clientY;

        document.onmousemove = onMouseMove;
        document.onmouseup = stopDrag;
    }

    (document.getElementById(elem.id + "_drag") || elem).onmousedown = onMouseDown;
}

for (const elem of document.getElementsByClassName("draggable")) {
    makeDraggable(elem);
}



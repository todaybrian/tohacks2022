function makeNodeDraggable(elem) {
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

for (const elem of document.getElementsByClassName("node")) {
    makeNodeDraggable(elem);
}



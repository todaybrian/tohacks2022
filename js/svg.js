function getLine(id) {
    // Gets svg polyline; if not exists, creates and adds line to svg
    let lineElem = document.getElementById(id);
    if (!lineElem) {
        lineElem = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        lineElem.setAttribute('id', id);
        lineElem.setAttribute('class', 'edge');
        document.getElementById("svg").appendChild(lineElem);
    }
    return lineElem;
}

function getEdgeLine(node1Id, node2Id) {
    // Gets the line that represents the edge node1Id -> node2Id
    return getLine(`edge${node1Id}_${node2Id}`);
}

function setEdgeLinePoints(lineElem, x1, y1, x2, y2) {
    // Sets the 2 endpoints of an svg polyline element
    lineElem.setAttribute('points', `${x1},${y1} ${(x1+x2)/2},${(y1+y2)/2} ${x2},${y2}`);
}

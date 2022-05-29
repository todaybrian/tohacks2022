g = new Graph();

const purple = '#d5bdfc';

g.addNode(0, 400, 130, false, 'Node 0', purple);
g.addNode(1, 400, 180, false, 'Node 1', purple);
g.addNode(2, 300, 230, false, 'Node 2', purple);
g.addNode(3, 500, 230, false, 'Node 3', purple);
g.addNode(4, 500, 280, false, 'Node 4', purple);
g.addNode(5, 500, 430, false, 'Node 5', purple);
g.addNode(6, 300, 430, false, 'Node 6', purple);

g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(5, 6);


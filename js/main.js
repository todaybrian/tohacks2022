g = new Graph();

const purple = '#d5bdfc';

g.addNode(0, 230, 230, false, 'Node 0', purple);
g.addNode(1, 380, 230, false, 'Node 1', purple);
g.addNode(2, 530, 230, false, 'Node 2', purple);
g.addNode(3, 530, 300, false, 'Node 3', purple);
g.addNode(4, 730, 300, false, 'Node 4', purple);
g.addNode(5, 230, 410, false, 'Node 5', purple);
g.addNode(6, 380, 410, false, 'Node 6', purple);

g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 4);
g.addEdge(5, 6);
g.addEdge(6, 4);

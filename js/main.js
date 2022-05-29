g = new Graph();

g.addNode(0, 400, 100, false);
g.addNode(1, 400, 150, false);
g.addNode(2, 300, 200, false);
g.addNode(3, 500, 200, false);
g.addNode(4, 500, 250, false);
g.addNode(5, 500, 400, false);
g.addNode(6, 300, 400, false);

g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(5, 6);

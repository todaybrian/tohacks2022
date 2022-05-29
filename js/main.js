g = new Graph();

g.addNode(0);
g.addNode(1);
g.addNode(2);
g.addNode(3, 500, 500);
g.addNode(4, 400, 400);
g.addNode(5, 400, 500);
g.addNode(6, 200, 500);

g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(5, 6);

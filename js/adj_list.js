class AdjList {
    constructor() {
        this.list = {};
    }

    get(u) {
        // returns set of nodes adjacent to u (creates if not exists)
        if (!(u in this.list)) {
            this.list[u] = Set();
        }
        return this.list[u];
    }

    addEdge(u, v) {
        // adds directed edge u -> v
        this.get(u).push(v);
    }
}

class AdjList {
    constructor() {
        this.list = {};
    }

    get(u) {
        // returns the set of nodes adjacent to u (creates if not exists)
        if (!(u in this.list)) {
            this.list[u] = new Set();
        }
        return this.list[u];
    }

    addEdge(u, v) {
        // adds directed edge u -> v
        // returns get(u)
        return this.get(u).add(v);
    }

    removeEdge(u, v) {
        // removes directed edge u -> v
        // returns get true if an element was removed; false otherwise
        return this.get(u).delete(v);
    }
}

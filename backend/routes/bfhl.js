const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {

    const data = req.body.data;

    const invalid_entries = [];
    const valid_edges = [];

    const regex = /^[A-Z]->[A-Z]$/;

    for (const edge of data) {

        if (!regex.test(edge)) {
            invalid_entries.push(edge);
            continue;
        }

        const [parent, child] = edge.split("->");

        if (parent === child) {
            invalid_entries.push(edge);
            continue;
        }

        valid_edges.push(edge);
    }


    const seen = new Set();

    const duplicate_edges = [];
    const unique_edges = [];

    for (const edge of valid_edges) {

        if (seen.has(edge)) {

            if (!duplicate_edges.includes(edge)) {
                duplicate_edges.push(edge);
            }

        } else {

            seen.add(edge);
            unique_edges.push(edge);

        }

    }

    const childParent = {};
const final_edges = [];

for (const edge of unique_edges) {

    const [parent, child] = edge.split("->");

    if (!childParent[child]) {

        childParent[child] = parent;
        final_edges.push(edge);

    }

}

const graph = {};

for (const edge of final_edges) {

    const [parent, child] = edge.split("->");

    if (!graph[parent]) {
        graph[parent] = [];
    }

    graph[parent].push(child);

}

const allNodes = new Set();
const childNodes = new Set();

for (const edge of final_edges) {

    const [parent, child] = edge.split("->");

    allNodes.add(parent);
    allNodes.add(child);

    childNodes.add(child);

}

const roots = [];

for (const node of allNodes) {

    if (!childNodes.has(node)) {
        roots.push(node);
    }

}

const visited = new Set();
const recStack = new Set();

function hasCycle(node) {

    if (recStack.has(node)) {
        return true;
    }

    if (visited.has(node)) {
        return false;
    }

    visited.add(node);
    recStack.add(node);

    if (graph[node]) {

        for (const neighbor of graph[node]) {

            if (hasCycle(neighbor)) {
                return true;
            }

        }

    }

    recStack.delete(node);

    return false;

}

const cycleRoots = [];

for (const node of Object.keys(graph)) {

    if (!visited.has(node)) {

        if (hasCycle(node)) {

            cycleRoots.push(node);

        }

    }

}

function buildTree(node) {

    const tree = {};

    if (graph[node]) {

        for (const child of graph[node]) {

            tree[child] = buildTree(child);

        }

    }

    return tree;

}

const hierarchies = [];

for (const root of roots) {

    const hierarchy = {};

    hierarchy[root] = buildTree(root);

    hierarchies.push({
        root: root,
        tree: hierarchy,
        depth: getDepth(root),
        has_cycle: false
    });

}

for (const cycleRoot of cycleRoots) {

    hierarchies.push({
        root: cycleRoot,
        tree: {},
        has_cycle: true
    });

}

let total_trees = 0;
let total_cycles = 0;
let largest_tree_root = "";

let maxDepth = 0;

for (const hierarchy of hierarchies) {

    if (hierarchy.has_cycle) {

        total_cycles++;

    } else {

        total_trees++;

        if (
            hierarchy.depth > maxDepth ||
            (
                hierarchy.depth === maxDepth &&
                hierarchy.root < largest_tree_root
            )
        ) {

            maxDepth = hierarchy.depth;
            largest_tree_root = hierarchy.root;

        }

    }

}

const summary = {
    total_trees,
    total_cycles,
    largest_tree_root
};

function getDepth(node) {

    if (!graph[node]) {
        return 1;
    }

    let maxDepth = 0;

    for (const child of graph[node]) {

        maxDepth = Math.max(maxDepth, getDepth(child));

    }

    return 1 + maxDepth;

}

res.json({

    user_id: "KIRTI_21042006",

    email_id: "kirti1330.be23@chitkara.edu.in",

    college_roll_number: "2310991330",

    hierarchies,

    invalid_entries,

    duplicate_edges,

    summary

});

});

module.exports = router;
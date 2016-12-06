const Graph = require('node-dijkstra');
class AI {
  constructor(start, end) {
    this.playerPosition = start;
    this.destination = end;
    this.g = {};
  }

  initializeGraph(edges,nodes){
    this.g = {};
    for(let i = 0; i < edges.length; i++){
      let target = edges[i].data.target;
      let source = edges[i].data.source;

      if (!this.g[source]) {
        this.g[source] = {};
      }
      if (!this.g[target]) {
        this.g[target] = {};
      }
      this.g[source][target] = edges[i].data.weight;
      this.g[target][source] = edges[i].data.weight;
    }
  }

  setDestination(dest) {
    this.destination = dest;
  }

  playerMove(playerPosition, edge) {
    // Data is same as above
    // return single integer where you want player ai to move
    this.playerPosition = playerPosition;
    let finalPos;

    // Your logic here
    let path = this.dijkistra(edge);
    finalPos = path[1];

    return finalPos;
  }

  adversaryMove(playerPosition) {
    //edges is an array, whose each element is an object whose data attribute is the actual edge
    // Edge contains source, target, width
    // So to get 1st edge's weight from edges array we will do edges[0]['data'].weight
    // nodes contain array whose each element is an object whose data attribute is actual node
    // node has only id
    // Player Position is the current node number at which player is
    // Return the edge object with source and target
    let selectedSource, selectedTarget;

    // Logic here
    this.playerPosition = playerPosition;
    let path = this.dijkistra();
    selectedSource = path[path.length-2];
    selectedTarget = path[path.length-1];
    return [selectedSource, selectedTarget];
  }

  dijkistra(edge) {
    if (edge) {
      this.g[edge.data.source][edge.data.target] = edge.data.weight;
      this.g[edge.data.target][edge.data.source] = edge.data.weight;
    }

    const route = new Graph(this.g);
    let path = route.path(this.playerPosition,this.destination);
    return path;
  }
}

let ai = new AI('1', '50');
export {ai};

const Graph = require('node-dijkstra');
class AI {
  constructor(start, end) {
    this.playerPosition = start;
    this.destination = end;
    this.g = {};
  }

  initiaizeGraph(edges,nodes){
    for(i=0; i<edges.length; i++){
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

  playerMove(edge,playerPosition) {
    // Data is same as above
    // return single integer where you want player ai to move
    let finalPos;
    let graph = this.getGraph(edges);

    // Your logic here
    let path = this.dijkistra(edge);
    finalPos = path[1];

    return finalPos;
  }

  adversaryMove(edges, nodes, playerPosition) {
    //edges is an array, whose each element is an object whose data attribute is the actual edge
    // Edge contains source, target, width
    // So to get 1st edge's weight from edges array we will do edges[0]['data'].weight
    // nodes contain array whose each element is an object whose data attribute is actual node
    // node has only id
    // Player Position is the current node number at which player is
    // Return the edge object with source and target
    let selectedSource, selectedTarget;

    // Logic here
    
    return {selectedSource, selectedTarget};
  }

  dijkistra(edge) {
    this.g[edge.data.source][edge.data.target] = edge.data.weight;
    this.g[edge.data.target][edge.data.source] = edge.data.weight;
    const route = new Graph(this.g);
    let path = route.path(playerPosition,this.destination);
    return path;
  }
}


export {AI};

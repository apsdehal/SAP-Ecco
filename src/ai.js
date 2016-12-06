class AI {
  constructor(start, end) {
    this.playerPosition = start;
    this.destination = end;
  }

  playerMove(edges, nodes, playerPosition) {
    // Data is same as above
    // return single integer where you want player ai to move
    let finalPos;

    // Your logic here

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

  dijkistra() {

  }
}


export {AI};

const player = {
  AI: "ai",
  HUMAN: "human"
};

const graph = {
  LARGE_GRAPH: "large_graph.json",
  MEDIUM_GRAPH: "medium_graph.json",
  SMALL_GRAPH: "small_graph.json"
};
class Options {
  constructor() {
    this.currentGraph = graph['LARGE_GRAPH'];
    this.currentPlayer = player['HUMAN'];
  }

  setListeners(cb) {
    this.setPlayerTypeListener(cb);
    this.setGraphTypeListener(cb);
  }

  setPlayerTypeListener(cb) {
    const playerBtnGroup = document.getElementById('player-type-options');
    let that = this;
    playerBtnGroup.addEventListener('click', function(e) {
      that.currentPlayer = graph[e.target.getAttribute('data-type')];
      that.setClasses.call(that, e, cb);
    });
  }

  setGraphTypeListener(cb) {
    const graphBtnGroup = document.getElementById('graph-size-options');
    let that = this;
    graphBtnGroup.addEventListener('click', function(e) {
      that.currentGraph = graph[e.target.getAttribute('data-type')];
      that.setClasses.call(that, e, cb);
    });
  }

  setClasses(e, cb) {
    if (e.target.classList.contains('btn-primary')) {
      return;
    }

    let eles = e.target.parentNode.getElementsByClassName('btn-primary')[0];
    eles.classList.remove('btn-primary');

    e.target.classList.remove('btn-default');
    e.target.classList.add('btn-primary');
    cb(this)
  }
}

let options = new Options();
export { options };

const player = {
  AI: "ai",
  HUMAN: "human"
};

const graph = {
  LARGE_GRAPH: "large_graph.json",
  MEDIUM_GRAPH: "medium_graph.json",
  SMALL_GRAPH: "small_graph.json"
};

const final = {
  LARGE_GRAPH: "80",
  MEDIUM_GRAPH: "40",
  SMALL_GRAPH: "20"
};

const { utils } = require('./utils').default;

class Options {
  constructor() {
    this.currentGraph = graph['LARGE_GRAPH'];
    this.currentPlayer = player['AI'];
    this.destination = final['LARGE_GRAPH'];
  }

  setListeners(cb) {
    this.setPlayerTypeListener(cb);
    this.setGraphTypeListener(cb);
    this.setResetListener(cb);
  }

  setPlayerTypeListener(cb) {
    const playerBtnGroup = document.getElementById('player-type-options');
    let that = this;
    playerBtnGroup.addEventListener('click', function(e) {
      that.currentPlayer = player[e.target.getAttribute('data-type')];
      that.setClasses.call(that, e, cb);
    });
  }

  setGraphTypeListener(cb) {
    const graphBtnGroup = document.getElementById('graph-size-options');
    let that = this;
    graphBtnGroup.addEventListener('click', function(e) {
      that.currentGraph = graph[e.target.getAttribute('data-type')];
      that.destination = final[e.target.getAttribute('data-type')];
      that.setClasses.call(that, e, cb);
    });
  }

  setResetListener(cb) {
    const resetBtn = document.getElementById('reset');
    let that = this;
    resetBtn.addEventListener('click', function(e) {
      utils.alertMessage('info', 'Resetting');
      cb(that);
    })
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
export { options, player, graph };

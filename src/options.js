const player = {
  AI: 'ai',
  HUMAN: 'human'
};

const graph = {
  LARGE_GRAPH: 'large_graph.json',
  MEDIUM_GRAPH: 'medium_graph.json',
  SMALL_GRAPH: 'small_graph.json'
};

const final = {
  LARGE_GRAPH: '80',
  MEDIUM_GRAPH: '40',
  SMALL_GRAPH: '20'
};

const { utils } = require('./utils').default;

class Options {
  constructor() {
    this.currentGraph = graph['SMALL_GRAPH'];
    this.currentPlayer = player['AI'];
    this.destination = final['SMALL_GRAPH'];
  }

  setListeners(cb) {
    this.setPlayerTypeListener(cb);
    this.setGraphTypeListener(cb);
    this.setResetListener(cb);
    this.setHelpListener();
  }

  setPlayerTypeListener(cb) {
    const playerBtnGroup = document.getElementById('player-type-options');
    let that = this;
    playerBtnGroup.addEventListener('click', function (e) {
      that.currentPlayer = player[e.target.getAttribute('data-type')];
      that.setClasses.call(that, e, cb);
    });
  }

  setGraphTypeListener(cb) {
    const graphBtnGroup = document.getElementById('graph-size-options');
    let that = this;
    graphBtnGroup.addEventListener('click', function (e) {
      that.currentGraph = graph[e.target.getAttribute('data-type')];
      that.destination = final[e.target.getAttribute('data-type')];
      that.setClasses.call(that, e, cb);
    });
  }

  setResetListener(cb) {
    const resetBtn = document.getElementById('reset');
    let that = this;
    resetBtn.addEventListener('click', function (e) {
      utils.alertMessage('info', 'Resetting');
      cb(that, true);
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

  setHelpListener() {
    document.getElementById('help')
    .addEventListener('click', function (e) {
      let helperDiv = document.createElement('div');
      let helperChildDiv = document.createElement('div');
      helperDiv.style.cssText = 'z-index: 3; position: absolute; top: 0;' +
      ' left: 0; right: 0; bottom: 0; width: 100%; display: flex;' +
      'justify-content: center; align-items: center';

      helperChildDiv.classList.add('bs-callout');
      helperChildDiv.classList.add('bs-callout-info'); 

      helperChildDiv.style.cssText = 'z-index: 3; width: 30%; height: 300px;' +
      'background-color: rgb(256, 256, 256);';

      helperDiv.appendChild(helperChildDiv);

      let screen = document.createElement('div');
      screen.style.cssText = 'z-index: 2; position: absolute; top: 0;' +
      ' left:0; right:0; bottom: 0; background-color: rgba(220, 220, 220, 0.5)';

      document.body.appendChild(helperDiv);
      document.body.appendChild(screen);

      window.setTimeout(() => {

        document.body.addEventListener('click', function handler(e) {
          if (e.target === helperChildDiv) {
            e.stopPropagation();
            return;
          } else {
            document.body.removeChild(helperDiv);
            document.body.removeChild(screen);
            document.body.removeEventListener(e.type, handler)
          }
        })
      }, 1000);
    });
  }
}

let options = new Options();
export { options, player, graph };

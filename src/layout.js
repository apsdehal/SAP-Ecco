let { settings } = require('./settings');
import cytoscape from 'cytoscape';
const { utils } = require('./utils').default;
const { options, player, graph } = require('./options');
const { ai } = require('./ai');

const start = '1';
const final = '50';

class Layout {
  constructor(st, fi) {
    this.cy = null;
    this.currentNode = null;
    this.start = st || start;
    this.final = fi || final;
    this.turn = 0; // 0 = Player, 1 = adversary
    this.playerType = player.HUMAN;
    this.elements = {};
    this.version = 0;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
  }

  initialize(edges, nodes, reset) {
    this.elements = {edges, nodes};
    settings.elements = JSON.parse(JSON.stringify(this.elements));
    this.cy = cytoscape(settings);
    this.final = options.destination;

    if (reset) {
      this.version = 0;
    }

    this.playerType = options.currentPlayer;
    this.completed = false;

    if (this.playerType === player.AI) {
      ai.initializeGraph(edges, nodes);
      ai.setDestination(this.final);
    }

    this.current = this.start;
    this.cy.getElementById(this.final).addClass('destination');

    this.neighbors = this.colorNeighbors();
    this.cy.getElementById(this.start).removeClass('next').addClass('current');

    if (this.playerType === player.HUMAN) {
      this.setupGameWithPlayer();
    } else {
      this.setupGameWithAI();
    }
  }

  setupGameWithPlayer() {
    this.setNodeTapListener();
    this.setEdgeTapListener();
    this.setMouseoverListener();
  }

  setupGameWithAI() {
    if (this.version === 0) {
      this.setNodeTapListener(this.getAdversaryMoveByAI);
    } else {
      this.getPlayerMoveByAI(this.start);
      this.setEdgeTapListener(this.getPlayerMoveByAI);
    }
    this.setMouseoverListener();
  }

  alternateRoles() {
    this.version = !this.version;

    utils.alertMessage('info', 'Roles will change now. You are ' + (this.version ? 'adversary' : 'player'));

    this.initialize(this.elements.edges, this.elements.nodes);
  }

  setMouseoverListener() {
    this.cy.on('mouseover', 'edge', function(event) {
      var edge = this;
      var edgedetail = document.getElementById('edgedetail');
      edgedetail.style.visibility = 'visible';
      edgedetail.innerHTML = '<h4>Weight: ' + this.data('weight') + '</h4>Edge from ' + this.data('source') + ' to ' + this.data('target');
    });
  }

  setNodeTapListener(cb) {
    var that = this;
    this.cy.on('tap', 'node', function () {
      var nodes = this;

      if (that.completed) {
        utils.alertMessage('danger', 'Game completed, use reset');
      }

      if (that.turn === 1) {
        utils.alertMessage('danger', 'Adversary turn')
        return;
      }


      if (that.testValidNode(nodes) === 0) {
        utils.alertMessage('warning', 'This node is not a neighbor of current node ' + that.current);
        return;
      }

      that.setPlayerScore.call(that, nodes);

      if (that.testDestination(nodes) == 1) {
        if (that.version === 1) {
          that.showWinner,call(that);
          return;
        }
        utils.alertMessage('success', 'You have reached destination');
        that.alternateRoles();
        return;
      }

      that.colorCurrentNode(nodes);

      if (that.playerType === player.AI) {
        cb.call(that, that.current);
      }
    });
  }

  setPlayerScore(node) {
    let curr = this.cy.getElementById(this.current);
    let edge = curr.connectedEdges(function () {
      return this.target().anySame(node)
    });

    edge = edge[0];

    if (this.version === 0) {
      this.playerOneScore += parseInt(edge.data('weight'), 10);
    } else {
      this.playerTwoScore += parseInt(edge.data('weight'), 10);
    }
  }

  getPlayerMoveByAI(playerPosition) {
    let move = ai.playerMove(playerPosition);
    const node = this.cy.getElementById(move.toString());

    this.setPlayerScore(node);

    if (this.testDestination(node)) {
      if (this.version) {
        this.showWinner();
      }
      utils.alertMessage('success', 'AI has reached destination');
      return;
    }

    this.colorCurrentNode(node);
  }

  getAdversaryMoveByAI(playerPosition) {
    let edge = ai.adversaryMove(playerPosition);
    const edgeId = edge[0] + '_' + edge[1];
    const el = this.cy.getElementById(edgeId);

    this.doubleEdge(el);
    this.turn = 0;
  }

  showWinner() {
    this.completed = true;
    let winner =
    (this.playerOneScore < this.playerTwoScore ?
      "Player 1" :
      ("Player 2" + (this.playerType === player['AI'] ? "(AI)" : "")));

    if (this.playerOneScore === this.playerTwoScore) {
      winner = "It is a tie";
    }
    utils.alertMessage('info', 'Player 1 score: ' + this.playerOneScore);
    utils.alertMessage('info', 'Player 2 score: ' + this.playerTwoScore);
    utils.alertMessage('warning', 'Winner is: ' + winner);
  }

  setEdgeTapListener(cb) {
    let that = this;
    this.cy.on('tap', 'edge', function (event) {
      var edge = this;

      if (that.completed) {
        utils.alertMessage('danger', 'Game completed, use reset');
      }

      if (that.turn === 0) {
        utils.alertMessage('danger', 'Player Turn');
        return;
      }

      that.turn = 0;
      that.doubleEdge.call(that, edge);

      if (that.playerType === player.AI) {
        cb.call(that, that.current, edge);
      }
    });
  }

  colorCurrentNode(node) {
    this.turn = 1;

    this.cy.getElementById(this.current).removeClass('current');
    this.neighbors.uncolor();

    node.removeClass('next');
    this.current = node.data('id');

    this.neighbors = this.colorNeighbors();
    node.removeClass('next');
    node.addClass('current');
    utils.alertMessage('success', 'Player moved to ' + this.current);
  }

  doubleEdge(edge) {
    var wt = edge.data('weight');

    var src = edge.data('source');
    var target = edge.data('target');

    var revEdge = this.cy.getElementById(target + '_' + src);
    revEdge.data('weight', wt * 2);

    edge.data('weight', wt * 2);

    // edge.style('width', wt * 2);
    // revEdge.style('width', wt * 2);

    window.clearInterval(this.inter);
    this.inter = window.setInterval(function () {
      edge.toggleClass('next');
    }, 1000);

    var that = this;
    window.setTimeout(function () {
      window.clearInterval(that.inter);
    }, 6000);

    let msg = 'Adversary doubled edge ' + edge.data('source') + ' ' + edge.data('target') + ' to ' + edge.data('weight');

    utils.alertMessage('success', msg);
  }

  colorNeighbors() {
    var nodes = this.cy.getElementById(this.current);
    var connectedEdges = nodes.connectedEdges().addClass('next');
    connectedEdges.data('width', 100);

    var connectedNodes = connectedEdges.targets();

    Array.prototype.push(connectedNodes, connectedEdges.sources());

    connectedNodes.forEach(function (node) {
      console.log(node.data('id'));
      node.addClass('next');
    })

    return {
      uncolor: function () {
        connectedNodes.forEach(function (node) {
          node.removeClass('next');
        });
        connectedEdges.removeClass('next');
      }
    };
  }

  testDestination(node) {
    const finalNode = this.cy.getElementById(this.final);
    return node.anySame(finalNode);
  }

  testValidNode(node) {
    var currentNode = this.cy.getElementById(this.current);
    var connectedEdges = currentNode.connectedEdges(function () {
      return this.target().anySame(node)
    });

    return connectedEdges.length;
  }
};

let layout = new Layout();
export {layout};

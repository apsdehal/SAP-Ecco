let { settings } = require('./settings');
import cytoscape from 'cytoscape';

const start = '1';
const final = '50';
class Layout {
  constructor(st, fi) {
    this.cy = null;
    this.currentNode = null;
    this.start = st || start;
    this.final = fi || final;
    this.turn = 0; // 0 = Player, 1 = adversary
  }

  initialize(edges, nodes) {
    settings.elements = {edges, nodes};
    this.cy = cytoscape(settings);

    this.current = this.start;
    this.cy.getElementById(this.final).addClass('destination');

    var neighbors = this.colorNeighbors();
    this.cy.getElementById(this.start).removeClass('next').addClass('current');

    let that = this;

    this.cy.on('tap', 'node', function () {
        var nodes = this;

        if (that.turn === 1) {
          var message = document.getElementById('message');
          message.style.visibility = 'visible';
          message.textContent = '';
          window.setTimeout(function () {
            message.textContent = 'Adversary turn';
          }, 1000);
          return;
        }


        if (that.testValidNode(nodes) === 0) {
          var message = document.getElementById('message');
          message.style.visibility = 'visible';
          message.textContent = '';
          window.setTimeout(function () {
            message.textContent = 'This node is not a neighbor of current node ' + that.current;
          }, 1000);
          return;
        }

        if (that.testDestination(nodes) == 1) {
          var message = document.getElementById('message');
          message.style.visibility = 'visible';
          message.textContent = '';
          window.setTimeout(function () {
            message.textContent = 'You have reached the destination';
          }, 1000);
          return;
        }

        that.turn = 1;

        that.cy.getElementById(that.current).removeClass('current');
        neighbors.uncolor();

        this.removeClass('next');
        that.current = this.data('id');

        neighbors = that.colorNeighbors();
        this.removeClass('next');
        this.addClass('current');
      });

    this.cy.on('tap', 'edge', function (event) {
        var edge = this;

        if (that.turn === 0) {
          var message = document.getElementById('message');
          message.style.visibility = 'visible';
          message.textContent = '';
          window.setTimeout(function () {
            message.textContent = 'Player turn';
          }, 1000);
          return;
        }

        that.turn = 0;
        var wt = edge.data('weight');

        var src = edge.data('source');
        var target = edge.data('target');

        var revEdge = that.cy.getElementById(target + '_' + src);
        revEdge.data('weight', wt * 2);

        edge.data('weight', wt * 2);
        var message = document.getElementById('message');
        message.style.visibility = 'visible';
        message.textContent = '';

        edge.style('width', wt * 2);
        revEdge.style('width', wt * 2);

        var inter = window.setInterval(function () {
          edge.toggleClass('next');
        }, 1000);

        window.setTimeout(function () {
          window.clearInterval(inter);
        }, 6000);

        window.setTimeout(function () {
          message.textContent = 'Adversary doubled edge ' + edge.data('source') + ' ' + edge.data('target') + ' to ' + edge.data('weight');
        }, 1000);

      })

      this.cy.on('mouseover', 'edge', function(event) {
        var edge = this;
        var edgedetail = document.getElementById('edgedetail');
        edgedetail.style.visibility = 'visible';
        edgedetail.innerHTML = 'Edge from ' + this.data('source') + ' to ' + this.data('target') + '<br/>Weight: ' + this.data('weight');
      });

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
    const finalNode = this.cy.getElementById(final);
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
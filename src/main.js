import cytoscape from 'cytoscape';
const { utils } = require('./utils').default;
let { settings } = require('./settings');

utils.loadJSON('data.json', utils.createElements, null, startCyto);


function startCyto(edges, nodes) {
  var start = '1';
  var final = '50';
  settings.elements = {edges, nodes};
  var cy = cytoscape(settings);

  var current = start;
  cy.getElementById(final).addClass('destination');

  var neighbors = colorNeighbors();
  cy.getElementById(start).removeClass('next').addClass('current');


  var turn = 0; // 0 = Player, 1 = adversary

  function colorNeighbors() {
    var nodes = cy.getElementById(current);
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


  function testValidNode(node) {
    var currentNode = cy.getElementById(current);
    var connectedEdges = currentNode.connectedEdges(function () {
      return this.target().anySame(node)
    });

    return connectedEdges.length;
  }

  function testDestination(node) {
    var finalNode = cy.getElementById(final);
    return node.anySame(finalNode);
  }

  cy.on('tap', 'node', function () {
    var nodes = this;

    if (turn === 1) {
      var message = document.getElementById('message');
      message.style.visibility = 'visible';
      message.textContent = '';
      window.setTimeout(function () {
        message.textContent = 'Adversary turn';
      }, 1000);
      return;
    }


    if (testValidNode(nodes) === 0) {
      var message = document.getElementById('message');
      message.style.visibility = 'visible';
      message.textContent = '';
      window.setTimeout(function () {
        message.textContent = 'This node is not a neighbor of current node ' + current;
      }, 1000);
      return;
    }

    if (testDestination(nodes) == 1) {
      var message = document.getElementById('message');
      message.style.visibility = 'visible';
      message.textContent = '';
      window.setTimeout(function () {
        message.textContent = 'You have reached the destination';
      }, 1000);
      return;
    }

    turn = 1;

    cy.getElementById(current).removeClass('current');
    neighbors.uncolor();

    this.removeClass('next');
    current = this.data('id');

    neighbors = colorNeighbors();
    this.removeClass('next');
    this.addClass('current');
  });

  cy.on('tap', 'edge', function (event) {
    var edge = this;

    if (turn === 0) {
      var message = document.getElementById('message');
      message.style.visibility = 'visible';
      message.textContent = '';
      window.setTimeout(function () {
        message.textContent = 'Player turn';
      }, 1000);
      return;
    }

    turn = 0;
    var wt = edge.data('weight');

    var src = edge.data('source');
    var target = edge.data('target');

    var revEdge = cy.getElementById(target + '_' + src);
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

  cy.on('mouseover', 'edge', function(event) {
    var edge = this;
    var edgedetail = document.getElementById('edgedetail');
    edgedetail.style.visibility = 'visible';
    edgedetail.innerHTML = 'Edge from ' + this.data('source') + ' to ' + this.data('target') + '<br/>Weight: ' + this.data('weight');
  });

}

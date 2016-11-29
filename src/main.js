function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

loadJSON('data.json', createElements);

var edges, nodes;

function createElements(data) {
  edges = data['links'];

  edges = edges.map(function (x) {
    x['weight'] = 1;
    x['source'] += 1;
    x['target'] += 1;
    x['id'] = x['source'].toString() + '_' + x['target'].toString();

    return {data: x};
  });

  edgesReverse = edges.map(function (data) {
    var x = {};
    x['source'] = data.data['target'];
    x['target'] = data.data['source'];
    x['weight'] = 1;
    x['id'] = x['source'].toString() + '_' + x['target'].toString();

    return {data: x};
  })

  Array.prototype.push.apply(edges, edgesReverse);

  nodes = data['nodes'];

  nodes = nodes.map(function (x) {
    x['id'] += 1;
    return {data: x};
  });

  startCyto();
}

function startCyto() {
  var start = '1';
  var final = '50';
  var cy = cytoscape({
    container: document.getElementById('container'),
    elements: {
      nodes: nodes,

      edges: edges
    },
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#0072BB',
          'label': 'data(id)',
          'width': 25,
          'height': 25,
          'font-size': 25
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#FF4C3B',
          'width': 'mapData(weight, 3, 100, 1, 70)',
        }
      },
      {
        selector: '.current',
        style: {
            'background-color': '#00FF00',
            'line-color': '#61bffc',
            'transition-property': 'background-color, line-color',
            'transition-duration': '0.5s'
        }
      },
      {
        selector: '.next',
        style: {
            'background-color': '#FF4C3B',
            'line-color': '#61bffc',
            'transition-property': 'background-color, line-color',
            'transition-duration': '0.5s'
        }
      },
      {
        selector: '.destination',
        style: {
            'background-color': '#FFCC00',
            'line-color': '#61bffc',
            'transition-property': 'background-color, line-color',
            'transition-duration': '0.5s'
        }
      }
    ],
    layout: {
      name: 'cose',
      animate: true,
      fit: true,
      randomize: true
    }
  });

  var current = start;
  cy.getElementById(final).addClass('destination');

  var neighbors = colorNeighbors();
  cy.getElementById(start).removeClass('next').addClass('current');


  function colorNeighbors() {
    var nodes = cy.getElementById(current);
    var connectedEdges = nodes.connectedEdges();

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
      }
    };
  }

  cy.on('tap', 'node', function () {
    var nodes = this;
    cy.getElementById(current).removeClass('current');
    neighbors.uncolor();

    this.removeClass('next');
    current = this.data('id');

    neighbors = colorNeighbors();
    this.removeClass('next');
    this.addClass('current');
    console.log(current);
  });
}

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
    x['id'] = x['source'].toString() + '_' + x['target'].toString();

    return {data: x};
  });

  nodes = data['nodes'];

  nodes = nodes.map(function (x) {
    return {data: x};
  });

  startCyto();
}

function startCyto() {

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
          'background-color': 'red',
          'label': 'data(id)',
          'width': 10,
          'height': 10,
          'font-size': 8
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': 'green',
          'width': 'mapData(weight, 0, 100, 1, 70)',
        }
      },
      {
        selector: '.highlighted',
        style: {
            'background-color': '#61bffc',
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
  })

}

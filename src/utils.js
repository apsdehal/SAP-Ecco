class Utils {
  constructor() {

  }
  loadJSON(path, success, error, cb) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () =>
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText), cb);
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }

  createElements(data, cb) {
    var edges, nodes;

    edges = data['links'];

    edges = edges.map(function (x) {
      x['weight'] = 1;
      x['source'] += 1;
      x['target'] += 1;
      x['id'] = x['source'].toString() + '_' + x['target'].toString();

      return {data: x};
    });

    var edgesReverse = edges.map((data) => {
      var x = {};
      x['source'] = data.data['target'];
      x['target'] = data.data['source'];
      x['weight'] = 1;
      x['id'] = x['source'].toString() + '_' + x['target'].toString();

      return {data: x};
    })

    Array.prototype.push.apply(edges, edgesReverse);

    nodes = data['nodes'];

    nodes = nodes.map((x) => {
      x['id'] += 1;
      return {data: x};
    });

    cb(edges, nodes);
  }
}

export default {
  utils: new Utils()
};

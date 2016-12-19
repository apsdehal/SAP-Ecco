const nodeBackgroundColor = '#0072BB';
const edgeLineColor = '#0072BB';
const currentBackgroundColor = '#00FF00';
const currentLineColor = '#61bffc';
const nextLineColor = '#FF4C3B';
const nextBackgroundColor = '#FF4C3B';
const destinationBackgroundColor = '#FFCC00';
const destinationLineColor = '#61bffc';

let settings = {
  container: document.getElementById('container'),
  elements: {
    nodes: [],

    edges: []
  },
  style: [
    {
      selector: 'node',
      style: {
        'background-color': nodeBackgroundColor,
        'label': '',
        'width': 25,
        'height': 25,
        'font-size': 20
      }
    },
    {
      selector: 'edge',
      style: {
        'line-color': edgeLineColor,
        'width': 'mapData(weight, 1, 10, 1, 10)',
      }
    },
    {
      selector: '.current',
      style: {
          'background-color': currentBackgroundColor,
          'line-color': currentLineColor,
          'transition-property': 'background-color, line-color',
          'transition-duration': '0.5s'
      }
    },
    {
      selector: '.next',
      style: {
          'background-color': nextBackgroundColor,
          'line-color': nextBackgroundColor,
          'transition-property': 'background-color, line-color',
          'transition-duration': '0.5s'
      }
    },
    {
      selector: '.destination',
      style: {
          'background-color': destinationBackgroundColor,
          'line-color': destinationLineColor,
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
}

export { settings };

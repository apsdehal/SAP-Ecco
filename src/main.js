const { utils } = require('./utils').default;
let { layout } = require('./layout');
let { options } = require('./options');

function main(options, reset) {
  if (reset){
    layout.setVersion(0);
  }

  utils.loadJSON(
    options.currentGraph,
    utils.createElements,
    null,
    layout.initialize.bind(layout)
  );
}

main(options);

options.setListeners(main);

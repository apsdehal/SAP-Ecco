const { utils } = require('./utils').default;
let { layout } = require('./layout');
let { options } = require('./options');

function main(options) {
  utils.loadJSON(
    options.currentGraph,
    utils.createElements,
    null,
    (function () {
      var args = Array.prototype.slice.call(arguments);
      args.push(options);
      layout.initialize.apply(layout, args);
    })
  );
}

main(options);

options.setListeners(main);

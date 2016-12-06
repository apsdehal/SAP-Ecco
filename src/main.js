const { utils } = require('./utils').default;
let { layout } = require('./layout');

utils.loadJSON('data.json', utils.createElements, null, layout.initialize.bind(layout));

/* eslint-disable import/no-extraneous-dependencies */
const vueJest = require("vue-jest/lib/template-compiler");

module.exports = {
  process(content) {
    const { render } = vueJest({
      content,
      attrs: {
        functional: false
      }
    });

    return `module.exports = { render: ${render} }`;
  }
};

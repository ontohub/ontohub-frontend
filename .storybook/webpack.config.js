const { injectBabelPlugin } = require("react-app-rewired");

function rewireEmotion(config, env, emotionBabelOptions = {}) {
  return injectBabelPlugin(["emotion", emotionBabelOptions], config);
}

module.exports = function(config, env) {
  return rewireEmotion(config, env, { inline: true });
};

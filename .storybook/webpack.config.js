const { injectBabelPlugin } = require("react-app-rewired");

function rewireEmotion(config, env, emotionBabelOptions = {}) {
  return injectBabelPlugin(["emotion", emotionBabelOptions], config);
}

module.exports = function(config, env) {
  console.log(config);
  config = rewireEmotion(config, env, { inline: true });
  console.log(config);
  return config;
};

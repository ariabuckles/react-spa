/**
 * React-spa initialization
 */

// Reflux config
var Reflux = require("reflux");
Reflux.nextTick(require('setimmediate2'));
Reflux.PublisherMethods.triggerAsync = Reflux.PublisherMethods.trigger;

// Data interface
var DI = require("client/core/dataInterface");

module.exports = {
  init: function() {
    console.log("init");
  },
  renderToDom: function(water) {
    // Check if initial data is available
    if (water) {
      require("client/core/syncDataProvider").hydrate(water);
    }

    // React tap event plugin
    require("react-tap-event-plugin")();

    // Init routes
    var router = require('client/core/router');

    // Init stores
    require("client/stores/session");
    require("client/stores/question");
    require("client/stores/questions");

    // Temporary tap event plugin
    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();

    // Render
    router.renderToDom();

    // Clear initial data
    require("client/core/syncDataProvider").dry();
  },
  renderToString: function(path, water, profile) {
    // Init data interface profiler
    DI.enableProfiling(profile);

    // Hydrate data
    require("client/core/syncDataProvider").hydrate(water || {});

    // Init stores
    require("client/stores/session");
    require("client/stores/question");
    require("client/stores/questions");

    // Render html body
    var htmlBody = router.renderToString(path || "/");

    // Get document title
    var DocumentTitle = require("react-document-title");
    var docTitle = DocumentTitle.rewind();

    // Render application
    return {
      body: htmlBody,
      title: docTitle
    };
  },
  getProfile: function() {
    return DI.getProfile();
  }
};

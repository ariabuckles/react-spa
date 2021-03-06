var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var Paper = mui.Paper;
var reflux = require("reflux");
var MarkdownViewer = require('client/components/markdown/viewer.jsx');
var ReactSpinner = require("react-spinner");

var connect= require("client/libraries/tmp_connect");
var DocumentTitle = require("client/components/core/documentTitle.jsx");
var questionStore = require("client/stores/question");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var componentTransitionMixin = require("client/mixins/componentTransition");

var Question = React.createClass({
  mixins: [
    connect(questionStore),
    ImmutableRenderMixin,
    componentTransitionMixin("questions", "questionId")
  ],
  render: function() {
    var view = this;
    var title = "Q: " + (view.state.get("title") || "");
    var body = view.state.get("content");

    var content;
    if (view.state.get("content")) {
      content = (
        <DocumentTitle title={title}>
          <div className="question">
            <div className="inner">
              <h1>{view.state.get("title")}</h1>
              <MarkdownViewer value={body}/>
            </div>
          </div>
        </DocumentTitle>
      );
    }
    else {
      content = (
        <DocumentTitle title={"Loading question..."}>
          <ReactSpinner/>
        </DocumentTitle>
      );
    }
    return (content);
  }
});
module.exports = Question;

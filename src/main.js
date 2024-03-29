"use strict";
var React = require('react');
var Authors = require('./components/authors/authorPage');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, function(Handler) {
   React.render(<Handler/>, document.getElementById('app'));
});
"use strict";

var React = require('react');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            course: {id: '', title: '', category: '', author: {}},
            authors: [],
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function () {
        var courseId = this.props.params.id;
        this.setState({authors: AuthorStore.getAllAuthors()});
        if (courseId) {
            this.setStat({course: CourseStore.getCoursesById(courseId)});
        }
    },

    

    render: function () {
        return (
            <h1>Yo!</h1>
        );
    }
});

module.exports = ManageCoursePage;
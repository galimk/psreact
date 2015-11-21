"use strict";

var React = require('react');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var toastr = require('toastr');
var CourseForm = require('./courseForm');
var _ = require('lodash');

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
            course: {id: '', title: '', category: '', selectedAuthor: 0},
            authors: [],
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function () {
        var courseId = this.props.params.id;
        var authors = [];
        var apiAuthors = AuthorStore.getAllAuthors();

        _.forEach(apiAuthors, function (author) {
            authors.push({
                id: author.id,
                name: author.firstName + ' ' + author.lastName
            });
        });

        this.setState({authors: authors});


        if (courseId) {
            var course = CourseStore.getCoursesById(courseId);
            course.selectedAuthor = course.author.id;
            this.setState({course: course});
        }
    },

    setCourseState: function (event) {
        event.preventDefault();
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        if (field == 'author') {
            this.state.course.selectedAuthor = value;
        } else {
            this.state.course[field] = value;
        }
    },

    saveCourse: function (event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.state.course.author = _.findWhere(this.state.authors, {id: this.state.course.selectedAuthor});

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }


        this.setState({dirty: false});
        toastr.success('pure course awesomness just happened!');
        this.transitionTo('courses');
    },

    courseFormIsValid: function () {
        var formIsValid = true;

        this.state.errors = {}; // clear any previous errors

        if (this.state.course.title.length < 3) {
            this.state.errors.title = 'Title name must be at least 3 characters';
            formIsValid = false;
        }

        if (this.state.course.category.length < 3) {
            this.state.errors.course = 'Category name must be at least 3 characters';
            formIsValid = false;
        }

        if (this.state.course.watchHref.length < 4) {
            this.state.errors.watchHref = 'Watch link must be provided';
        }

        //_.find(this.state.authors, { 'id' : this.state.course.selectedAuthor });

        var authorIdIsCorrect = _.some(this.state.authors, {'id': this.state.course.selectedAuthor});
        if (!authorIdIsCorrect) {
            this.state.errors.author = 'Please select an author';
        }

        this.setState({errors: this.state.errors});

        return formIsValid;
    },

    render: function () {
        return (
            <div>
                <CourseForm course={this.state.course}
                            authors={this.state.authors}
                            onChange={this.setCourseState}
                            onSave={this.saveCourse}
                            errors={this.state.errors}/>
            </div>
        );
    }
});

module.exports = ManageCoursePage;
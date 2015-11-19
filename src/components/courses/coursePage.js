"use strict";

var React = require('react');
var CourseList = require('./courseList');
var Link = require('react-router').Link;
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');

var CoursePage = React.createClass({
    getInitialState: function() {
        return {
            courses: CourseStore.getAllCourses()
        };
    },

    _onChange: function () {
        this.setState({authors: CourseStore.getAllCourses()});
    },

    componentWillMount: function () {
        CourseStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._onChange);
    },

    render: function () {

        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses}/>
            </div>
        );
    }

});

module.exports = CoursePage;
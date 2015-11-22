"use strict";

var React = require('react');
var Link = require('react-router').Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },

    deleteCourse: function(courseId, event) {
        event.preventDefault();
        CourseActions.deleteCourse(courseId);
        toastr.success('yo deleted the course!');
    },

    render: function () {

        var createCourseRow = function (course) {
            return (
                <tr key={course.id}>
                    <td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}> Delete Course </a></td>
                    <td><Link to="goToCourse" params={{id: course.id}}>{course.id}</Link></td>
                    <td><a href={course.watchHref}>{course.title}</a></td>
                    <td>{course.category}</td>
                    <td>{course.author.name}</td>
                </tr>
            );
        };


        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                    </thead>
                    <tbody>
                    {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

});


module.exports = CourseList;
"use strict";

var React = require('react');
var Input = require('../common/textInput');
var DropDown = require('../common/dropDown');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        authors: React.PropTypes.array.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired
    },


    render: function () {
        return (
            <form>
                <h1>Manage Course</h1>

                <Input
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.firstName}
                    />

                <Input
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category}
                    />

                <Input
                    name="watchHref"
                    label="Watch Link"
                    value={this.props.course.watchHref}
                    onChange={this.props.onChange}
                    error={this.props.errors.watchHref}
                    />

                <DropDown
                    name="author"
                    label="Author"
                    value={this.props.selectedAuthor}
                    onChange={this.props.onChange}
                    error={this.props.errors.selectedAuthor}
                    itemKey="id"
                    itemText="name"
                    list={this.props.authors}
                    />


                <input type="submit" value="Save"
                       className="btn btn-default"
                       onClick={this.props.onSave}
                    />
            </form>
        );
    }

});

module.exports = CourseForm;
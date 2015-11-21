"use strict";

var React = require('react');

var DropDown = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
        list: React.PropTypes.array.isRequired,
        itemKey: React.PropTypes.string.isRequired,
        itemText: React.PropTypes.string.isRequired
    },

    render: function () {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += ' ' + 'has-error';
        }

        var renderItem = function (item) {
            var selected = item[this.props.itemKey] === this.props.value;
            return (
                <option selected={selected} value={item[this.props.itemKey]}>{item[this.props.itemText]}</option>
            );
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>

                <div className="field">
                    <select name={this.props.name}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            ref={this.props.value}
                            onChange={this.props.onChange}>
                        {this.props.list.map(renderItem, this)}
                    </select>

                    <div className="input"> </div>
                </div>
            </div>
        );
    }
});

module.exports = DropDown;


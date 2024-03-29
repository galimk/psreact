"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _courses = [];

var CoursesStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllCourses: function () {
        return _courses;
    },

    getCoursesById: function (id) {
        return _.find(_courses, {id: id});
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:

            _courses = action.initialData.courses;
            CoursesStore.emitChange();
            break;

        case ActionTypes.UPDATE_COURSE:
            var existingCourse = _.find(_courses, {id: action.course.id});
            var existingCourseIndex = _.indexOf(_courses, existingCourse);
            _courses.splice(existingCourseIndex, 1, action.course);
            CoursesStore.emitChange();
            break;

        case ActionTypes.CREATE_COURSE:
            _courses.push(action.course);
            CoursesStore.emitChange();
            break;

        case ActionTypes.DELETE_COURSE:
            _.remove(_courses, function (course) {
                return course.id === action.id;
            });
            CoursesStore.emitChange();
            break;
    }
});


module.exports = CoursesStore;
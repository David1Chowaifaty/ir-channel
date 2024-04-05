'use strict';

const axios = require('./axios-345bdc66.js');

const initialState = {
    entries: null,
    direction: 'ltr',
};
const { state: locales, onChange: onCalendarDatesChange } = axios.createStore(initialState);

exports.locales = locales;

//# sourceMappingURL=locales.store-976d2caf.js.map
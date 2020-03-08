'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const pharmacySchema = new Schema({
  name: String,
  description: String
});

module.exports = Mongoose.model('Create', pharmacySchema);

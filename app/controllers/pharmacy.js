'use strict';

const Create = require('../models/create');
const User = require('../models/user');
const Joi = require('@hapi/joi');

const Pharmacy = {
  home: {
    handler: async function (request, h) {
      return h.view('home', { title: 'Create a Pharmacy Listing' });
    }
  },
  list: {
    handler: async function(request, h) {
      try {
        const creates = await Create.find().lean();
        return h.view('list', {
          title: 'Pharmacies Listed to date',
          creates: creates
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  newPharmacy: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const newCreate = new Create({
          name: data.name,
          description: data.description,

        });
        await newCreate.save();
        return h.redirect('/list');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  update: {
    handler: async function (request, h) {
      var id = request.params.id
      var pharmacie = {};
      const creates = await Create.find().lean();
      creates.forEach(element => {
        if (element._id == id) {
          pharmacie = element;
          return true
        }
      });
      return h.view('pharmacy_settings', { pharmacie: pharmacie });
    }
  },

  delete: {
    handler: async function (request, h) {
      try {
        var id = request.params.id;
        var pharmacy = await Create.findById(id);
        pharmacy.remove();
        return h.redirect('/list');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Pharmacy;

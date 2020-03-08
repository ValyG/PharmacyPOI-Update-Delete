'use strict';

const Accounts = require('./app/controllers/accounts');
const Creates = require('./app/controllers/pharmacy');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/signup', config: Accounts.showSignup },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/login', config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'GET', path: '/home', config: Creates.home },
  { method: 'GET', path: '/list', config: Creates.list },
  { method: 'POST', path: '/newPharmacy', config: Creates.newPharmacy },
  { method: 'GET', path: '/update/{id}', config: Creates.update },
  { method: 'GET', path: '/delete/{id}', config: Creates.delete },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    },
    options: { auth: false }
  }
];

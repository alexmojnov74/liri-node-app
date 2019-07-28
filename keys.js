
console.log('on load');

var dotenv = require("dotenv").config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

console.log('this is loaded');
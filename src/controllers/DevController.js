const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index (mostrar lista do recurso), show (mostrar um único recurso), store (criar), update(alterar), delete (deleta))

module.exports = {

  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    
    let dev = await Dev.findOne({github_username});

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      //continuar...
      const { name = login, avatar_url, bio } = apiResponse.data;
      
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    
    };

    return response.json(dev);
  },

  async update(request, response) {

    const { github_username, techs, latitude, longitude, bio, name} = request.body;

    let dev = await Dev.findOne({github_username});

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const techsArray = parseStringAsArray(techs);

    if (dev) {
      dev = await Dev.updateOne({
        techs: techsArray,
        bio,
        name,
        location
      })
    }

    return response.json(dev); 
  },

  async destroy(request, response) {

    const { github_username } = request.query;

    let dev = await Dev.findOne({github_username});

    if ( dev ) {
      dev = await Dev.deleteOne(dev);
    }

    return response.json(dev); 
  },
};
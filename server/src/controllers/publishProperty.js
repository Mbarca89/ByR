const { Properties, Images } = require('../db');
const path = require('path');
const fs = require('fs');
const {SERVER_URL} = process.env

const publishProperty = async (req, res) => {
  const { data } = req.body;
  const { images } = req.files;
  const dataOk = JSON.parse(data);
  try {
    const result = await Properties.create({
      featured:dataOk.featured,
      name: dataOk.name,
      description: dataOk.description,
      type: dataOk.type,
      category: dataOk.category,
      price: dataOk.price,
      currency: dataOk.currency,
      location: dataOk.location,
      size: dataOk.size,
      constructed: dataOk.constructed,
      bedrooms: dataOk.bedrooms,
      bathrooms: dataOk.bathrooms,
      kitchen: dataOk.kitchen,
      garage: dataOk.garage,
      others: dataOk.others,
      services: dataOk.services,
      amenities: dataOk.amenities,
    });

    const folderPath = path.join('public/', result.id.toString());
    fs.mkdir(folderPath, { recursive: true }, (error) => {
      if (error) {
        return res.status(500).json({ error: 'No se pudo crear la carpeta.' });
      }
    })
    images.forEach(async (image) => {
      const imagePath = path.join(folderPath, image.name).replace("\\","/"); // Ruta completa al archivo de destino
      image.mv(imagePath, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
      });
      const imageUrl = `${SERVER_URL}/${imagePath}`
      const urlOk = imageUrl.split('/').filter(item => item !=='public').join('/')
      await Images.create({propertyId:result.id,url:urlOk,name:image.name})
    });
    return res.status(200).send('Propiedad cargada con exito!')
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { publishProperty };
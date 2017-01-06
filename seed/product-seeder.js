require('dotenv').config({ path: '../.env' });

const Product = require('../models/product');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOD);

var products = [
    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/250px-Gothiccover.png',
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: 'http://us.blizzard.com/static/_images/games/cataclysm/wallpapers/wall2/wall2-1440x900.jpg',
      title: 'World of Warcraft Video Game',
      description: 'Also awesome? But of course it was better in vanilla ...',
      price: 20
    }),
    new Product({
      imagePath: 'https://media.playstation.com/is/image/SCEA/call-of-duty-infinite-warfare-two-column-01-ps4-us-28jun16?$image_block_desktop$',
      title: 'Call of Duty Video Game',
      description: 'Awesome Game!!!!',
      price: 25
    }),
    new Product({
      imagePath: 'https://yt3.ggpht.com/-f5r2FntzwLw/AAAAAAAAAAI/AAAAAAAAAAA/tDTuXgcRVYA/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
      title: 'Battlefield 1 Video Game',
      description: 'Awesome Game!!!!',
      price: 30
    }),
];

let done = 0;

for (let i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done == products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}

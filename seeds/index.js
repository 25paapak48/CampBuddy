const mongoose = require('mongoose');

//Importing cities from file
const cities = require('./cities');
//Importing places and descriptors from file
const { places, descriptors } = require('./seedHelpers');

//Requiring the model
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-buddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Database connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    //Generating random campgrounds from cities and seedHelpers files
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '625794752b4ba95c28a74a6d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores soluta animi laudantium distinctio illum magnam molestiae accusamus, fugiat minus modi quibusdam cupiditate, hic quasi minima? Magni nisi quod a ea? Eius veritatis consequatur vero culpa illo atque? Nostrum alias iste in delectus mollitia, quas optio distinctio cum facere, ducimus quae, deserunt enim dolores tempore eaque veritatis facilis tempora accusantium est. Labore, eum. Nisi sequi molestiae corrupti veniam! Quisquam, quibusdam rem, quia repellendus earum fugiat ipsum ipsa enim tenetur, ipsam dolore sed qui! Soluta vero, incidunt eius atque praesentium ex repudiandae.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/bobbyx89/image/upload/v1648694384/YelpCamp/w6yhfuine9ufzmfxrvw8.jpg',
                    filename: 'w6yhfuine9ufzmfxrvw8'
                },
                {
                    url: 'https://res.cloudinary.com/bobbyx89/image/upload/v1648694381/YelpCamp/e2sincqixe5plq1kpf1k.jpg',
                    foldername: 'e2sincqixe5plq1kpf1k'
                }
            ]
        })
        await camp.save();
    }
}

//Closing the connection after running the seeds
seedDB().then(() => {
    mongoose.connection.close();
})
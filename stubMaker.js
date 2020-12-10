const faker = require('faker');
const slugify = require('slugify');
const axios = require('axios');

const endpoint = 'http://localhost:3000'
const serverEndpoint = 'https://my-json-server.typicode.com/Ismail-Opatola/pleasant-tour-db'

const helpers = {};
// const handler = {};

helpers.randomArrayOfFakeDate = (length, generator) => {
  return Array.from({length}, generator)
}

helpers.randomArray = (min, max, obj) => {
  const len = faker.random.number({ min, max });
  const array = []
  
  for (let i = 0; i < len; ++i) {
    array[i] = typeof obj === 'function' ? obj(i) : merge({}, obj);
  }
  return array;
};

helpers.calAvearageRating = (ratings) => {
  let result
  let ratingCount = {
    1: 0,
    2: 0, 
    3: 0, 
    4: 0, 
    5: 0, 
    6: 0
  }
  
  ratings.forEach(data => {
    if([1, 2, 3, 4, 5, 6].includes(data.rating)) {
      ratingCount[data.rating]++
    }
  });
  
    result = 
      ((1 * ratingCount[1] 
     + 2 * ratingCount[2] 
     + 3 * ratingCount[3] 
     + 4 * ratingCount[4] 
     + 5 * ratingCount[5] 
     + 6 * ratingCount[6]) 
     / 6)

    return Number.parseFloat(result.toFixed(2));
}

helpers.calTotalRating = (ratings) => ratings.length;

helpers.getFormData = (formId) => {
  let formElement = document.getElementById(formId);
  let data = new FormData(formElement);
  return data
}

// handle create tour

// create tours
writeTour = function(e) {
  e.preventDefault();

  console.log({atrr: e.target.getAttribute('id')});

  const formData = helpers.getFormData(e.target.getAttribute('id'));

  // for (let [key, value] of formData.entries()) {
  //   console.log({key: key, value: value})
  // }

  const fakeRatings = helpers.randomArray(1, 10, 
    () => ({
      "date": faker.date.recent(),
      "name": faker.name.findName(),
      "rating": faker.random.number({
        "min": 1,
        "max": 6
      })
    })
  )

    const fakeTourDates = helpers.randomArray(1, 3, function() { 
      return faker.date.future()
    });

  const newData = Object.freeze({
    id: faker.random.uuid(),
    title: formData.get("title"),
    description: {
      details: formData.get("details"),
      access: formData.get("access"),
      accomodation: formData.get("accomodation"),
       attractions: formData.get("attractions"),
       activities: formData.get("activities"),
       amenities: formData.get("amenities"),
       map: formData.get("map")
    },
    flyerUrl: `${slugify(formData.get("title")).toLowerCase()}.pdf`,
    imgUrl: `${slugify(formData.get("title")).toLowerCase()}.jpg`,
    pageUrl: slugify(formData.get("title")).toLowerCase(),
    destination: formData.get("destination"),
    ratings: fakeRatings,
    avearageRating: helpers.calAvearageRating(fakeRatings),
    totalRatings: helpers.calTotalRating(fakeRatings),
    price: formData.get("price"),
    tourDates: fakeTourDates,
    category: formData.get('category'),
    // categorySlug: slugify(data.get('category'), "_")
  });

  const themeData = {
    "id": newData.id,
    "title": newData.title,
    "destination": newData.destination,
    "price": newData.price,
    "avearageRating": newData.avearageRating,
    "imagUrl": newData.imgUrl,
    "pageUrl": newData.pageUrl
  }

  console.log(newData);
  console.log(fakeRatings);

  // update tours
  axios.post(`${endpoint}/tours`, newData).then((result) => {
    console.log(`response create tour`);
    console.log(result);

    // update themes
    axios.post(`${endpoint}/${newData.category}`, themeData).then((result) => {
      console.log(`response update theme`);
      console.log(result);
    }).catch((err) => {
      console.log('error');
      console.log(err.message);
    });
  }).catch((err) => {
    console.log(err.stack);
  });
}

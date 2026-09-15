/* v8 — Real destination photography
   Images are hosted by Wikimedia Commons / upload.wikimedia.org.
   The photo credits and licences are listed in PHOTO-CREDITS.md.
   These overrides intentionally replace the old decorative name-card SVGs.
*/

window.PHOTO_OVERRIDES = {
  cdo: {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Skyline_of_Cagayan_de_Oro(cropped).jpg'
    ]
  },
  camiguin: {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Camiguin_White_Island.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Camiguin_White_Island.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9f/White_Beach_in_Mantigue_Island%2C_Camiguin.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Spanish_Church_Ruins_Gerald_Mondala.jpg'
    ]
  },
  bukidnon: {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg'
    ]
  },
  iligan: {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Tinago_falls_in_Iligan_City.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Tinago_falls_in_Iligan_City.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tinago_Falls.jpg'
    ]
  },
  ferry: {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/2/24/MV_Immaculate_Stars_Cebu_Port_night_view_%28Cebu_City%3B_01-16-2024%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/2/24/MV_Immaculate_Stars_Cebu_Port_night_view_%28Cebu_City%3B_01-16-2024%29.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Interior_of_2GO_Travel_ferry.JPG'
    ]
  },
  cebu: {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Skyline_of_Cebu_City.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1b/Skyline_of_Cebu_City.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sirao_Garden.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Magellan%27s_Cross_in_Cebu_City.jpg'
    ]
  },
  'return-cdo': {
    cover: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/CDO_skyline_Gusa_(Cagayan_De_Oro_City%3B_12-09-2023).jpg'
    ]
  },
  departure: {
    cover: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Laguindingan_airport.jpg',
    gallery: [
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Laguindingan_airport.jpg',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Arrival_Area_-_Laguindingan_International_Airport.JPG'
    ]
  }
};

const POI_PHOTOS = [
  ['White Island', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Camiguin_White_Island.jpg'],
  ['Mantigue', 'https://upload.wikimedia.org/wikipedia/commons/9/9f/White_Beach_in_Mantigue_Island%2C_Camiguin.jpg'],
  ['Guiob', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Spanish_Church_Ruins_Gerald_Mondala.jpg'],
  ['Tuasan', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tuasan_Falls.jpg'],
  ['Kitanglad', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg'],
  ['Tinago', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Tinago_falls_in_Iligan_City.jpg'],
  ["Magellan's Cross", 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Magellan%27s_Cross_in_Cebu_City.jpg'],
  ['Sirao', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sirao_Garden.jpg'],
  ['Temple of Leah', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Temple_of_Leah%2C_Cebu_City.jpg'],
  ['Taoist Temple', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Taoist_temple%2C_Cebu_City.jpg'],
  ['Kawasan Falls', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kawasan_Falls_Cebu_Island.jpg'],
  ['Oslob', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Oslob_Whale_shark.jpg'],
  ['Fort San Pedro', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_San_Pedro_title.jpg'],
  ['Basilica del Santo Niño', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Basilica_del_Santo_Nino_in_Cebu.jpg']
];

function photoMatches(name, key) {
  const value = String(name?.es || name?.en || '').toLowerCase();
  return value.includes(key.toLowerCase());
}

if (window.PHOTO_OVERRIDES && window.tripData) {
  tripData.locations.forEach(location => {
    const override = window.PHOTO_OVERRIDES[location.key];
    if (!override) return;
    location.cover = override.cover;
    location.gallery = override.gallery;
  });

  tripData.days.forEach(day => {
    day.loc = day.loc || null;
    day.pois?.forEach(poi => {
      const match = POI_PHOTOS.find(([key]) => photoMatches(poi.name, key));
      if (match) poi.image = match[1];
    });
  });
}

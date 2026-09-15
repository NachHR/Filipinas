/* V8 — authentic destination photography. Sources: Wikimedia Commons. */
window.PHOTO_OVERRIDES={
 cdo:{cover:'https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg',gallery:['https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Skyline_of_Cagayan_de_Oro(cropped).jpg']},
 camiguin:{cover:'https://upload.wikimedia.org/wikipedia/commons/f/f6/Camiguin_White_Island.jpg',gallery:['https://upload.wikimedia.org/wikipedia/commons/f/f6/Camiguin_White_Island.jpg','https://upload.wikimedia.org/wikipedia/commons/9/9f/White_Beach_in_Mantigue_Island%2C_Camiguin.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Spanish_Church_Ruins_Gerald_Mondala.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Tuasan_Falls_plunge_pool.jpg']},
 bukidnon:{cover:'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg',gallery:['https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg']},
 iligan:{cover:'https://upload.wikimedia.org/wikipedia/commons/7/72/Tinago_falls_in_Iligan_City.jpg',gallery:['https://upload.wikimedia.org/wikipedia/commons/7/72/Tinago_falls_in_Iligan_City.jpg']},
 ferry:{cover:'https://commons.wikimedia.org/wiki/Special:Redirect/file/MV_Immaculate_Stars_Cebu_Port_night_view_(Cebu_City%3B_01-16-2024).jpg',gallery:['https://commons.wikimedia.org/wiki/Special:Redirect/file/MV_Immaculate_Stars_Cebu_Port_night_view_(Cebu_City%3B_01-16-2024).jpg']},
 cebu:{cover:'https://upload.wikimedia.org/wikipedia/commons/1/1b/Skyline_of_Cebu_City.jpg',gallery:['https://upload.wikimedia.org/wikipedia/commons/1/1b/Skyline_of_Cebu_City.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Sirao_Garden.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Temple_of_Leah,_Cebu_City.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Taoist_temple,_Cebu_City.jpg']},
 'return-cdo':{cover:'https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg',gallery:['https://upload.wikimedia.org/wikipedia/commons/f/fb/Skyline_of_Cagayan_de_Oro.jpg']},
 departure:{cover:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Laguindingan_airport.jpg',gallery:['https://commons.wikimedia.org/wiki/Special:Redirect/file/Laguindingan_airport.jpg','https://commons.wikimedia.org/wiki/Special:Redirect/file/Arrival_Area_-_Laguindingan_International_Airport.JPG']}
};
const POI_PHOTOS=[
 ['White Island','https://upload.wikimedia.org/wikipedia/commons/f/f6/Camiguin_White_Island.jpg'],
 ['Mantigue','https://upload.wikimedia.org/wikipedia/commons/9/9f/White_Beach_in_Mantigue_Island%2C_Camiguin.jpg'],
 ['Guiob','https://commons.wikimedia.org/wiki/Special:Redirect/file/Old_Spanish_Church_Ruins_Gerald_Mondala.jpg'],
 ['Tuasan','https://commons.wikimedia.org/wiki/Special:Redirect/file/Tuasan_Falls_plunge_pool.jpg'],
 ['Kitanglad','https://upload.wikimedia.org/wikipedia/commons/3/3c/Mt_kitanglad.jpg'],
 ['Tinago','https://upload.wikimedia.org/wikipedia/commons/7/72/Tinago_falls_in_Iligan_City.jpg'],
 ["Magellan's Cross",'https://commons.wikimedia.org/wiki/Special:Redirect/file/Magellan%27s_Cross_in_Cebu_City.jpg'],
 ['Sirao','https://commons.wikimedia.org/wiki/Special:Redirect/file/Sirao_Garden.jpg'],
 ['Temple of Leah','https://commons.wikimedia.org/wiki/Special:Redirect/file/Temple_of_Leah,_Cebu_City.jpg'],
 ['Taoist Temple','https://commons.wikimedia.org/wiki/Special:Redirect/file/Taoist_temple,_Cebu_City.jpg'],
 ['Kawasan Falls','https://commons.wikimedia.org/wiki/Special:Redirect/file/Kawasan_Falls_Cebu_Island.jpg'],
 ['Oslob','https://commons.wikimedia.org/wiki/Special:Redirect/file/Oslob_Whale_shark.jpg'],
 ['Fort San Pedro','https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_San_Pedro_title.jpg'],
 ['Basilica del Santo Niño','https://commons.wikimedia.org/wiki/Special:Redirect/file/Basilica_del_Santo_Nino.jpg']
];
function photoMatches(name,key){const value=String(name?.es||name?.en||'').toLowerCase();return value.includes(key.toLowerCase())}
if(window.tripData){tripData.locations.forEach(location=>{const o=window.PHOTO_OVERRIDES[location.key];if(o){location.cover=o.cover;location.gallery=o.gallery}});tripData.days.forEach(day=>day.pois?.forEach(poi=>{const match=POI_PHOTOS.find(([key])=>photoMatches(poi.name,key));if(match)poi.image=match[1]}))}

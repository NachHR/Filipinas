/* Final photo layer — all destination and POI photography is local. */
window.PHOTO_VERSION='8.11.0';
const PHOTO_OVERRIDES={
  cdo:{cover:'./images/cdo.webp',gallery:['./images/cdo.webp']},
  camiguin:{cover:'./images/camiguin.webp',gallery:['./images/camiguin.webp','./images/mantigue.webp','./images/guiob.webp','./images/tuasan.webp']},
  bukidnon:{cover:'./images/bukidnon.webp',gallery:['./images/bukidnon.webp']},
  iligan:{cover:'./images/iligan.webp',gallery:['./images/iligan.webp']},
  ferry:{cover:'./images/ferry.webp',gallery:['./images/ferry.webp']},
  cebu:{cover:'./images/cebu.webp',gallery:['./images/cebu.webp','./images/sirao.webp','./images/temple-of-leah.webp','./images/taoist-temple.webp']},
  'return-cdo':{cover:'./images/cdo.webp',gallery:['./images/cdo.webp']},
  departure:{cover:'./images/airport.webp',gallery:['./images/airport.webp']}
};
const POI_PHOTOS=[
  ['White Island','./images/camiguin.webp'],
  ['Mantigue','./images/mantigue.webp'],
  ['Guiob','./images/guiob.webp'],
  ['Tuasan','./images/tuasan.webp'],
  ['Kitanglad','./images/kitanglad.webp'],
  ['Pearl Lounge','./images/pearl-lounge.webp'],
  ['Madrid-Barajas','./images/madrid-barajas.webp'],
  ['Tinago','./images/iligan.webp'],
  ["Magellan's Cross",'./images/magellans-cross.webp'],
  ['Sirao','./images/sirao.webp'],
  ['Temple of Leah','./images/temple-of-leah.webp'],
  ['Taoist Temple','./images/taoist-temple.webp'],
  ['Kawasan Falls','./images/kawasan.webp'],
  ['Oslob','./images/oslob.webp'],
  ['Fort San Pedro','./images/fort-san-pedro.webp'],
  ['Santo Niño','./images/santo-nino.webp']
];
function photoMatches(name,key){
  const value=String(name?.es||name?.en||'').toLowerCase();
  return value.includes(key.toLowerCase());
}
// data.js declares a top-level `const tripData`; top-level consts are not properties of window.
// Use the lexical binding directly so the photo layer actually applies its local assets.
if(typeof tripData!=='undefined' && tripData){
  tripData.locations.forEach(location=>{
    const o=PHOTO_OVERRIDES[location.key];
    if(o){location.cover=o.cover;location.gallery=o.gallery;}
  });
  tripData.days.forEach(day=>{
    const o=PHOTO_OVERRIDES[day.locationKey];
    if(o){
      day.loc=day.loc||{};
      day.loc.cover=o.cover;
      day.loc.gallery=o.gallery;
    }
    day.pois?.forEach(poi=>{
      const match=POI_PHOTOS.find(([key])=>photoMatches(poi.name,key));
      if(match)poi.image=match[1];
    });
  });
}

// Intrinsic dimensions reserve image space before decoding; update when replacing a photo.
window.PHOTO_DIMENSIONS = {
  "airport.webp": [1280, 960],
  "bukidnon.webp": [800, 606],
  "camiguin.webp": [1280, 720],
  "cdo.webp": [1280, 772],
  "cebu.webp": [1424, 448],
  "ferry.webp": [1280, 960],
  "fort-san-pedro.webp": [1280, 959],
  "guiob.webp": [1280, 853],
  "iligan.webp": [1280, 853],
  "kawasan.webp": [1280, 643],
  "kitanglad.webp": [1280, 853],
  "madrid-barajas.webp": [1280, 797],
  "magellans-cross.webp": [783, 576],
  "mantigue.webp": [720, 540],
  "oslob.webp": [1280, 720],
  "pearl-lounge.webp": [1200, 884],
  "santo-nino.webp": [1280, 960],
  "sheikh-zayed-mosque.webp": [1280, 960],
  "sirao.webp": [1280, 960],
  "taoist-temple.webp": [1280, 960],
  "temple-of-leah.webp": [1280, 720],
  "tuasan.webp": [1280, 853],
  "zayed-airport.webp": [1280, 960]
};

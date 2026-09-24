/* Final photo layer — all destination and POI photography is local. */
window.PHOTO_VERSION='8.12.1';
const PHOTO_OVERRIDES={
  cdo:{cover:'./images/cdo.webp',gallery:['./images/cdo.webp','./images/cdo-night.webp']},
  camiguin:{cover:'./images/camiguin.webp',gallery:['./images/camiguin.webp','./images/white-island.webp','./images/mantigue.webp','./images/guiob.webp','./images/sunken-cemetery.webp','./images/tuasan.webp']},
  bukidnon:{cover:'./images/bukidnon.webp',gallery:['./images/bukidnon.webp','./images/manolo-fortich.webp','./images/campville-riverside.webp','./images/kitanglad.webp']},
  iligan:{cover:'./images/iligan.webp',gallery:['./images/iligan.webp']},
  ferry:{cover:'./images/ferry.webp',gallery:['./images/cdo-port.webp','./images/ferry.webp']},
  cebu:{cover:'./images/cebu.webp',gallery:['./images/cebu.webp','./images/sirao.webp','./images/temple-of-leah.webp','./images/taoist-temple.webp']},
  'return-cdo':{cover:'./images/cdo-night.webp',gallery:['./images/cdo.webp','./images/cdo-night.webp','./images/amaya-view.webp','./images/seven-seas.webp']},
  departure:{cover:'./images/airport.webp',gallery:['./images/airport.webp']}
};
const POI_PHOTOS=[
  ['High Ridge','./images/high-ridge.webp'],
  ['Sunken Cemetery','./images/sunken-cemetery.webp'],
  ['Campvill','./images/campville-riverside.webp'],
  ['Manolo Fortich','./images/manolo-fortich.webp'],
  ['Port of Cagayan de Oro','./images/cdo-port.webp'],
  ['Cebu Heritage Monument','./images/cebu-heritage-monument.webp'],
  ['Sumilon','./images/sumilon-sandbar.webp'],
  ['Tumalog','./images/tumalog.webp'],
  ['Simala','./images/simala.webp'],
  ['Carcar','./images/carcar-market.webp'],
  ['Amaya','./images/amaya-view.webp'],
  ['Seven Seas','./images/seven-seas.webp'],
  ['White Island','./images/white-island.webp'],
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
  return [name?.es, name?.en].some(value=>String(value||'').toLowerCase().includes(key.toLowerCase()));
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
    if(day.date==='2026-10-06')day.loc.cover='./images/manolo-fortich.webp';
    if(day.accommodationKey==='kisolon')day.loc.cover='./images/campville-riverside.webp';
    day.pois?.forEach(poi=>{
      const match=POI_PHOTOS.find(([key])=>photoMatches(poi.name,key));
      if(match)poi.image=match[1];
    });
  });
}

// Intrinsic dimensions reserve image space before decoding; update when replacing a photo.
window.PHOTO_DIMENSIONS = {
  "high-ridge.webp": [1216, 1161],
  "airport.webp": [
    1280,
    960
  ],
  "amaya-view.webp": [
    1600,
    900
  ],
  "bukidnon.webp": [
    800,
    606
  ],
  "camiguin.webp": [
    1600,
    1071
  ],
  "campville-riverside.webp": [
    1280,
    720
  ],
  "carcar-market.webp": [
    800,
    533
  ],
  "cdo-night.webp": [
    1098,
    539
  ],
  "cdo-port.webp": [
    1100,
    750
  ],
  "cdo.webp": [
    1280,
    772
  ],
  "cebu-heritage-monument.webp": [
    1200,
    800
  ],
  "cebu.webp": [
    1424,
    448
  ],
  "ferry.webp": [
    1280,
    960
  ],
  "firma_logo.webp": [
    512,
    512
  ],
  "fort-san-pedro.webp": [
    1280,
    959
  ],
  "guiob.webp": [
    1600,
    1067
  ],
  "iligan.webp": [
    1280,
    853
  ],
  "kawasan.webp": [
    1500,
    1000
  ],
  "kitanglad.webp": [
    1280,
    853
  ],
  "madrid-barajas.webp": [
    1280,
    797
  ],
  "magellans-cross.webp": [
    783,
    576
  ],
  "manolo-fortich.webp": [
    1024,
    576
  ],
  "mantigue.webp": [
    720,
    540
  ],
  "oslob.webp": [
    1280,
    720
  ],
  "pearl-lounge.webp": [
    1200,
    884
  ],
  "santo-nino.webp": [
    1280,
    960
  ],
  "seven-seas.webp": [
    1024,
    768
  ],
  "sheikh-zayed-mosque.webp": [
    1280,
    960
  ],
  "simala.webp": [
    1200,
    700
  ],
  "sirao.webp": [
    1280,
    960
  ],
  "sumilon-sandbar.webp": [
    1600,
    1067
  ],
  "sunken-cemetery.webp": [
    1350,
    1102
  ],
  "taoist-temple.webp": [
    1280,
    960
  ],
  "temple-of-leah.webp": [
    1280,
    720
  ],
  "tuasan.webp": [
    1280,
    853
  ],
  "tumalog.webp": [
    1600,
    1059
  ],
  "white-island.webp": [
    1280,
    720
  ],
  "zayed-airport.webp": [
    1280,
    960
  ]
};

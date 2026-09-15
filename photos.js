/* Final photo layer — all destination and POI photography is local. */
window.PHOTO_VERSION='8.2.0';
window.PHOTO_OVERRIDES={
  cdo:{cover:'images/cdo.webp',gallery:['images/cdo.webp']},
  camiguin:{cover:'images/camiguin.webp',gallery:['images/camiguin.webp','images/mantigue.webp','images/guiob.webp','images/tuasan.webp']},
  bukidnon:{cover:'images/bukidnon.webp',gallery:['images/bukidnon.webp']},
  iligan:{cover:'images/iligan.webp',gallery:['images/iligan.webp']},
  ferry:{cover:'images/ferry.webp',gallery:['images/ferry.webp']},
  cebu:{cover:'images/cebu.webp',gallery:['images/cebu.webp','images/sirao.webp','images/temple-of-leah.webp','images/taoist-temple.webp']},
  'return-cdo':{cover:'images/cdo.webp',gallery:['images/cdo.webp']},
  departure:{cover:'images/airport.webp',gallery:['images/airport.webp']}
};
const POI_PHOTOS=[
  ['White Island','images/camiguin.webp'],
  ['Mantigue','images/mantigue.webp'],
  ['Guiob','images/guiob.webp'],
  ['Tuasan','images/tuasan.webp'],
  ['Kitanglad','images/bukidnon.webp'],
  ['Tinago','images/iligan.webp'],
  ["Magellan's Cross",'images/cebu.webp'],
  ['Sirao','images/sirao.webp'],
  ['Temple of Leah','images/temple-of-leah.webp'],
  ['Taoist Temple','images/taoist-temple.webp'],
  ['Kawasan Falls','images/kawasan.webp'],
  ['Oslob','images/oslob.webp'],
  ['Fort San Pedro','images/fort-san-pedro.webp'],
  ['Basilica del Santo Niño','images/santo-nino.webp']
];
function photoMatches(name,key){const value=String(name?.es||name?.en||'').toLowerCase();return value.includes(key.toLowerCase())}
if(window.tripData){
  tripData.locations.forEach(location=>{
    const o=window.PHOTO_OVERRIDES[location.key];
    if(o){location.cover=o.cover;location.gallery=o.gallery;}
  });
  tripData.days.forEach(day=>{
    const o=window.PHOTO_OVERRIDES[day.locationKey];
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

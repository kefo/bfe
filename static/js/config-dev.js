var ie = (function(){
  var undef,
      v = 3,
      div = document.createElement('div'),
      all = div.getElementsByTagName('i');
  while (
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
    all[0]
  );
  return v > 4 ? v : undef;
}());
if (ie < 10) {
  $("#iealert").addClass("alert alert-danger");
  $("#iealert").html("Sorry, but the BIBFRAME Editor will not work in IE8 or IE9.")
}

function myCB(data) {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

/* Config object profiles
 * Editor profiles are read from a WS endpoint
 * The data are expected to be in a JSON array, with each object
 * in the array containing a "json" property that has the profile
 * itself. The "versoURL" variable is a convenience for setting the
 * base URL of verso in the "config" definition below.
 */
var rectobase = "http://localhost:3000";

if (env.RECTOBASE!==undefined)
    rectoBase = env.RECTOBASE;

var versoURL = rectoBase + "/verso/api";

var config = {
              /* "logging": {
                "level": "DEBUG",
                "toConsole": false
              },*/ 
  "url" : rectoBase,
  "baseURI": "http://id.loc.gov/",
  "basedbURI": "http://mlvlp04.loc.gov:8230",
  "resourceURI": "http://mlvlp04.loc.gov:8230/resources",
  "profiles": [
    //versoURL + "/configs?filter[where][configType]=profile"
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Admin Metadata",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Agents Contribution",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Agents Primary Contribution",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Agents",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Cartographic",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 DDC",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Extra menus",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Form",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Identifiers",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Item",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 LCC",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Language",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Monograph",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Moving Image-35mm Feature Film",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Moving Image-BluRay DVD",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Notated Music",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Note",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Place",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Publication, Distribution, Manufacturer Activity",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 RWO",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Rare Materials",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Related Works and Expressions",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Serial",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Series Information",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Sound Recording-Analog",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Sound Recording-Audio CD-R",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Sound Recording-Audio CD",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Title Information",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=BIBFRAME 2.0 Topic",
     versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=PMO Medium of Performance",
    // versoURL + "/configs?filter[where][configType]=profile&filter[where][name]=Test BSR monograph"
  ],
  "startingPoints": [
    {"menuGroup": "Monograph",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:Monograph:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:Monograph:Work" ]
       }

     ]},
    {"menuGroup": "Notated Music",
     "menuItems": [
       {
         label: "Create Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:NotatedMusic:Work" ]
       },
       {
         label: "Create RDA Expression",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:NotatedMusic:Expression" ]
       },
       {
         label: "Create Instance", 
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:NotatedMusic:Instance" ]
       }
     ]},
    {"menuGroup": "Serial",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Serial"],
         useResourceTemplates: [ "profile:bf2:Serial:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Text"],
         useResourceTemplates: [ "profile:bf2:Serial:Work" ]
       }

     ]},
    {"menuGroup": "Cartographic",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:Cartographic:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:Cartographic:Work" ]
       }

     ]},
    {"menuGroup": "Sound Recording: Audio CD",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:SoundRecording:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:SoundRecording:Work" ]
       }

     ]},
    {"menuGroup": "Sound Recording: Audio CD-R",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:SoundCDR:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:SoundCDR:Work" ]
       }

     ]},
    {"menuGroup": "Sound Recording: Analog",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:Analog:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:Analog:Work" ]
       }

     ]},
    {"menuGroup": "Moving Image: BluRay DVD",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:MIBluRayDVD:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:MIBluRayDVD:Work" ]
       }

     ]},
    {"menuGroup": "Moving Image: 35mm Feature Film",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:35mmFeatureFilm:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:35mmFeatureFilm:Work" ]
       }

     ]},
    {"menuGroup": "Rare Materials",
     "menuItems": [
       {
         label: "Instance",
         type: ["http://id.loc.gov/ontologies/bibframe/Instance"],
         useResourceTemplates: [ "profile:bf2:RareMat:Instance" ]
       },
       {
         label: "Work",
         type: ["http://id.loc.gov/ontologies/bibframe/Work"],
         useResourceTemplates: [ "profile:bf2:RareMat:Work" ]
       }

     ]}
  ],
  "api": ["save", "publish", "retrieveLDS", "retrieve", "deleteId"],
  "return": {
    "format": "jsonld-expanded",
    "callback": myCB
  }
}

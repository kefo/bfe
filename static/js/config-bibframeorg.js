function myCB(data) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

/* Config object profiles
* Editor profiles are read from a WS endpoint
* The data are expected to be in a JSON array, with each object
* in the array containing a "json" property that has the profile
* itself.
*/
var rectobase = "http://bibframe.org";

var baseDBURI;
var resourceURI;
var metaproxyURI;
var workContext;
var loadmarc=false;
var buildcontext = true;
var enableusertemplates=true;

var name = "config";

if (env.RECTOBASE!==undefined){
    rectobase = env.RECTOBASE;
}

if (env.BASEDBURI!=undefined) {
    baseDBURI = env.BASEDBURI;
    resourceURI = baseDBURI + "/resources";
    workContext = resourceURI + "/works/";
}

if (env.LOADMARC!=undefined) {
    loadmarc = env.LOADMARC;
}

if (loadmarc){
    metaproxyURI = env.METAPROXYURI;
}

if (env.BUILDCONTEXT!=undefined){
    buildcontext = env.BUILDCONTEXT;
}

if (env.ENABLEUSERTEMPLATES!=undefined){
    enableusertemplates=env.ENABLEUSERTEMPLATES;
}

if (env.VERSOBASE!==undefined){
    versobase = env.VERSOBASE;
} else {
    versobase = rectobase + "/verso";
}

var config = {
    "name": name,
    "url" : rectobase,
    "baseURI": "http://id.loc.gov/",
    "basedbURI": baseDBURI,
    "versobase": versobase,
    "resourceURI": resourceURI,
    "metaproxyURI": metaproxyURI,
    "buildContext": buildcontext,
    "buildContextFor": ['id.loc.gov/authorities/names/','id.loc.gov/authorities/subjects/','http://id.loc.gov/authorities/childrensSubjects','id.loc.gov/vocabulary/relators/','id.loc.gov/resources/works/', 'id.loc.gov/bfentities/providers/','id.loc.gov/entities/providers/','id.loc.gov/authorities/genreForms'],
    "buildContextForWorksEndpoint": workContext,
    "enableUserTemplates" :enableusertemplates,
    "enableLoadMarc": loadmarc,
    "startingPointsUrl": versobase + "/api/configs?filter[where][configType]=startingPoints&filter[where][name]=" + name,
    "literalLangDataUrl": versobase + '/api/configs?filter[where][configType]=literalLangData',
    "profiles": [
        versobase + "/api/configs?filter[where][configType]=profile"
    ],
    "api": ["save", "publish", "retrieveLDS", "retrieve", "deleteId", "setStartingPoints"],
    "return": {
        "format": "jsonld-expanded",
        "callback": myCB
    }
}

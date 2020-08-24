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
var rectobase = "http://bibframe.org";

var baseDBURI;
var resourceURI;
var metaproxyURI;
var workContext;
var oclckey;
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

if (env.OCLCKEY!=undefined) {
    oclckey = env.OCLCKEY;
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
    verobase = rectobase;
}
var versoURL = versobase + "/verso/api";

var config = {
    "name": name,
    "url" : rectobase,
    "baseURI": "http://id.loc.gov/",
    "basedbURI": baseDBURI,
    "resourceURI": resourceURI,
    "metaproxyURI": metaproxyURI,
    "buildContext": buildcontext,
    "buildContextFor": ['id.loc.gov/authorities/names/','id.loc.gov/authorities/subjects/','http://id.loc.gov/authorities/childrensSubjects','id.loc.gov/vocabulary/relators/','id.loc.gov/resources/works/', 'id.loc.gov/bfentities/providers/','id.loc.gov/entities/providers/','id.loc.gov/authorities/genreForms'],
    "buildContextForWorksEndpoint": workContext,
    "enableUserTemplates" :enableusertemplates,
    "enableLoadMarc": loadmarc,
    "oclckey": oclckey,
    "startingPointsUrl": versoURL + "/configs?filter[where][configType]=startingPoints&filter[where][name]=" + name,
    "literalLangDataUrl": versoURL + '/configs?filter[where][configType]=literalLangData',
    "profiles": [
        versoURL + "/configs?filter[where][configType]=profile"
    ],
    "api": ["save", "publish", "retrieveLDS", "retrieve", "deleteId", "setStartingPoints"],
    "return": {
        "format": "jsonld-expanded",
        "callback": myCB
    }
}
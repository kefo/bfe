/*eslint no-console: 0*/
/*eslint no-useless-escape: "error"*/
bfe.define('src/bfelabels', ['require', 'exports','src/bfelogging' ], function(require, exports) {

    var bfelog = require('src/bfelogging');

    exports.getLabel = function(resource, property, store, labelProp="http://www.w3.org/2000/01/rdf-schema#label") {
        var label = "";
        var triple = _.find(resource, {
                'p': property
            }); 
        if (triple !== undefined) {
            var uri = triple.o;
            var labelResource = _.find(store, {
                's': uri,
                'p': labelProp
            });
            if (labelResource !== undefined) {
                label = labelResource.o;
                
            } else if (uri.endsWith('marcxml.xml')) {
                label = /[^/]*$/.exec(uri)[0].split('.')[0];

            } else if (uri.match(/[works|instances]\/\d+#\w+\d+-\d+/) || uri.match(/_:.*/g) ) {
                // For URIs that have ampersands and other odd things.
                // For blank nodes.
                if(_.some(store, { s: uri, p: "http://www.w3.org/2000/01/rdf-schema#label"})){
                    label = _.find(store, { s: uri, p: "http://www.w3.org/2000/01/rdf-schema#label" }).o;  
                } else if(_.some(store, { s: uri, p: "http://www.loc.gov/mads/rdf/v1#authoritativeLabel"})){
                    label = _.find(store, { s: uri, p: "http://www.loc.gov/mads/rdf/v1#authoritativeLabel" }).o;
                } else if(_.some(store, { s: uri, p: "http://www.w3.org/1999/02/22-rdf-syntax-ns#value"})){
                    label = _.find(store, { s: uri, p: "http://www.w3.org/1999/02/22-rdf-syntax-ns#value" }).o;
                } else if(_.some(store, { s: uri, p: "http://id.loc.gov/ontologies/bflc/aap"})){
                    label = _.find(store, { s: uri, p: "http://id.loc.gov/ontologies/bflc/aap" }).o;
                } else {
                    label = "";
                }
                
            } else {
                bfelog.addMsg(new Error(), 'DEBUG', 'No label found for ' + property + ' - Looking up: ' + uri);
                findLabel(uri, function (foundLabel) {
                    label = foundLabel;
                });
            }
        }
        return label;
    };
    
    function findLabel(uri, callback) {
        var label = uri;
        uri = uri.replace(/^(https:)/,"http:");
        bfelog.addMsg(new Error(), 'DEBUG', 'findLabel uri: ' + uri);
        
        var jsonuri = uri + '.json';
        // normalize
        if (uri.startsWith('http://id.loc.gov/resources/works') || uri.startsWith('http://id.loc.gov/resources/instances')&& !_.isEmpty(config.resourceURI)) {
            jsonuri = uri.replace('http://id.loc.gov/resources', config.resourceURI) + '.jsonld';
            jsonuri = jsonuri.replace(/^(http:)/,"https:");
        } else if (uri.startsWith('http://id.loc.gov') && uri.match(/(authorities|vocabulary)/)) {
            jsonuri = uri + '.madsrdf_raw.json';
            jsonuri = jsonuri.replace(/^(http:)/,"https:");
        }
        bfelog.addMsg(new Error(), 'DEBUG', 'Making call to recto whichrt using: ' + jsonuri);
        $.ajax({
            type: 'GET',
            async: false,
            data: {
              uri: jsonuri
            },
            url: config.url + '/profile-edit/server/whichrt',
            success: function (data) {
                var labelElements;
                var authoritativeLabelElements;
                var aapElements;
                if(_.some(_.find(data, { '@id': uri }))) {
                    labelElements = _.find(data, { '@id': uri })['http://www.w3.org/2000/01/rdf-schema#label']
                    authoritativeLabelElements = _.find(data, { '@id': uri })['http://www.loc.gov/mads/rdf/v1#authoritativeLabel'];
                    aapElements = _.find(data, { '@id': uri })['http://id.loc.gov/ontologies/bflc/aap'];
                } 
                if (!_.isEmpty(labelElements)) {
                    label = labelElements[0]["@value"];
                } else if (!_.isEmpty(aapElements)) {
                    label = aapElements[0]["@value"]
                } else if (!_.isEmpty(authoritativeLabelElements)) {
                    label = authoritativeLabelElements[0]["@value"]
                } else {
                    // look for a rdfslabel
                    var labels = _.filter(data[2], function (prop) { if (prop[0] === 'rdfs:label') return prop; });
                    if (!_.isEmpty(labels)) {
                        label = labels[0][2];
                    } else if (_.has(data, "@graph")) {
                        if (_.some(data["@graph"], {"@id": uri})) {
                            label = _.find(data["@graph"], {"@id": uri})["rdf-schema:label"]
                        } else if ( _.some(data["@graph"], {"@type": ["http://id.loc.gov/ontologies/lclocal/Hub"]})) {
                            label = _.find(data["@graph"], {"@type": ["http://id.loc.gov/ontologies/lclocal/Hub"]})["rdf-schema:label"]
                        }
                    } 
                }
                callback(label);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bfelog.addMsg(new Error(), 'ERROR', 'Request status: ' + textStatus + '; Error msg: ' + errorThrown);
                callback(label);
            }
        });
    }
    
    exports.findURIatID = function(scheme, label) {
        var idInfo = { uri: "", validationMessage: "Not found", label: label };
        var labelservice = scheme + "/label/" + encodeURIComponent(label);
        labelservice = labelservice.replace(/^(http:)/,"https:");
        labelservice = labelservice.replace('//id.loc.gov/','//preprod-8288.id.loc.gov/');
        bfelog.addMsg(new Error(), 'DEBUG', 'labelservice uri: ' + labelservice);

        /*
        The browser will automatically follow 302, 303 redirects.  It is impossible
        therefore to perform a HEAD request, get the initial response, pluck the 
        X-URI out of it, and move one with our lives.  We must wait for all the 
        redirects to play out and the content delivered.
        */
        $.ajax({
            type: 'GET',
            async: false,
            headers: { 'Accept': 'application/json' },
            url: labelservice
        })
        .done(function(d, s, xhr) {
            uri = xhr.getResponseHeader('x-uri');
            preflabel = xhr.getResponseHeader('x-preflabel');
            idInfo = { uri: uri, label: preflabel };
            prelabel_normalized = preflabel.replace('.', '').replace(' ', '');
            label_normalized = label.replace('.', '').replace(' ', '');
            if (prelabel_normalized != label_normalized) {
                idInfo.validationMessage = "See reference";
            } else {
                idInfo.validationMessage = "Heading validated";
            }
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            bfelog.addMsg(new Error(), 'ERROR', 'Request status: ' + textStatus + '; Error msg: ' + errorThrown);
        });
        return idInfo;
    };

});
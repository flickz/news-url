'use strict'
const urlPaser = require('url');
const _ = require('lodash');
const tldParser = require('tld-extract');
const _url = require('./lib/_url');


/** Function that count occurrences of a substring in a string;
 * @param {String} url      
 * @param {String} verbose           
 * @return {Boolean} 
 * @author https://github/flickz
 */
exports.isValidNewsUrl = function(url, verbose=false){
     //check url format
     if(!_url._followUrlFormat(url)){
         if(verbose) console.log(url, " Rejected due to improper url format \n");
         return false;
     }
     
    if(_url._hasUrlQuery(url)){
       url = _url._removeArgs(url);        
    }
    
    let parsedUrl = urlPaser.parse(url, true);
    let urlPath = parsedUrl.path
    //the '/' which may exist at the end of the url provides us no information
    if(_.endsWith(urlPath, '/'))
        urlPath = urlPath.slice(0, -1);         
    
    if(_.startsWith(urlPath, '/'))
        urlPath = urlPath.slice(1);
    

    let pathChuncks = _url._splitPath(urlPath);
     //check if the url path is <= 1. because of url like this https://cnn.com/carrer.html
    if(pathChuncks.length <= 1){
        if(verbose) console.log(url, "Rejected due to small url path");
        return false;
    }
    if(_url._hasFileType(pathChuncks) && !_url._validFileType(pathChuncks)){
        if(verbose) console.log(url, " Rejected because filetype not allowed \n");
        return false;
    }
    
    if(_url._urlHasDate(url)){
        if(verbose) console.log(url, " verified for date \n");
        return true;
    }

    let tldData = tldParser(url);
    let domainName = _.pull(_.split(tldData.domain, '.'), tldData.tld)[0];
    let urlSlug = _.last(pathChuncks);

    if(_url._badDomain(tldData.domain)){
        if(verbose)console.log(url, " caught for bad domain \n");
        return false;
    }

    if(_url._hasNewsSlug(urlSlug, domainName)){
        if(verbose) console.log(url, " verified for being a slug \n");
        return true;
    }

    if(_url._hasBadPath(pathChuncks)){
        if(verbose)console.log(url, " caught for bad url paths \n");
        return false;
    }
    if(_url._hasGoodPath(pathChuncks)){
        if(verbose)console.log(url, " verified for good path \n");
        return true;
    }

    if(verbose)console.log(url, "caught for default false");
    return false;
}

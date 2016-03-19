var fs        = require("fs")
  , path      = require("path")
  
  , fnShift   = Array.prototype.shift
  
  , parseJSON = function ( data, callback ) {
    try {
      callback( void 0, JSON.parse( data ) );
    } catch ( ex ) {
      callback( ex );
    }
  };

function fromNS ( pathNS, options ) {

  var lastProperty
    , currentObj = this;

  
  if ( !pathNS || typeof pathNS !== 'string' ) {
    return currentObj;
  }
  
  options = options || {};
  
  
  pathNS = pathNS.split('::');
  lastProperty = pathNS.pop();
  
  try {
    pathNS.forEach(function( property ) {
      if ( currentObj[ property ] === void 0 ) {
        if ( !options.create ) {
          throw void 0;
        }
        currentObj[ property ] = {};
      }

      currentObj = currentObj[ property ];
      
    });
  } catch ( ex ) {
    
    if ( ex !== void 0 ) {
      throw ex;
    }
    
    currentObj = void 0;
    
  } finally {
    
    if ( currentObj ) {
      if ( options.setValue ) {
        currentObj = currentObj[ lastProperty ] = options.setValue;
      } else {
        currentObj = currentObj[ lastProperty ];
      }
    }
  }
  
  
  return currentObj;
} 


function Configuration( ) {
  return Configuration.prototype.load.apply(this, arguments);
}

Configuration.prototype = {
    "constructor": Configuration,
    
    "get": function getFromNS ( pathNS ) {
      return fromNS.call( this, pathNS );
    },
    
    "set": function setInNS ( pathNS, value ) {
      return fromNS.call( this, pathNS, { create: true, setValue: value } );
    },
  
    "load": function load () {
      var prop, obj;
      
      while ( ( obj = fnShift.call(arguments, 0, 1) )  ) {
        
        for ( prop in obj ) {
          if ( obj.hasOwnProperty( prop ) ) {
            this[ prop ] = obj[ prop ];
          }
        }
      }
      return this;
    }

};
Configuration.acceptedFiles = {
  "config.json" : parseJSON
};
Configuration.fromFiles = function( dir ) {
  var confObjects = [];
  
  function addConfig ( err, data ) {
    if (err) {
      throw err;
    }

    confObjects.push( data );
  }
  
  fs.readdirSync( dir ).forEach( function ( filename ) {
    var filenames = Configuration.acceptedFiles
      , filepath;

    if ( filename in filenames) {
      filepath = path.join( dir, filename );
      if ( filename.match(/.js$/) ) {
        try {
          filenames[ filename ]( filepath, addConfig );
        } catch (ex) {
          addConfig(ex);
        }
      } else {
        filenames[ filename ]( fs.readFileSync( filepath,  "utf8"), addConfig );
      }
    }


  });

  return confObjects;
};


module.exports = Configuration;
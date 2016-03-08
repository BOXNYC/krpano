/*
		Javascript API
    krpanoJS javascript plugin
    Skybox!
*/

var krpanoplugin = function() {
		
		var local = this,
		    krpano = null,
		    skybox = null,
		    depth = 8;
    
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
        if(!pluginobject.enabled) return;
        krpano = krpanointerface;
        if(krpano.get('version') < '1.0.7') {
          krpano.call('error(jsapi plugin - wrong krpano version! 1.0.7 or higher needed);');
          return;
        };
        if(typeof pluginobject.skybox === 'undefined') {
          krpano.call('error(skybox plugin - no skybox xml file defined. Define it at plugin skybox="skybox.xml" );');
          return;
        };
        if(typeof pluginobject.depth === 'number') depth = pluginobject.depth;
        var skyboxTarget = document.createElement('div');
        skyboxTarget.style.width  = '100%';
        skyboxTarget.style.height = '100%';
        skyboxTarget.id = krpano.display.viewerlayer.id + "-skybox";
        krpano.display.viewerlayer.appendChild(skyboxTarget);
        krpano.display.viewerlayer.childNodes[0].style.zIndex = 1;
        embedpano({
	        xml:pluginobject.skybox,
	        target: skyboxTarget.id,
	        html5:"prefer",
	        passQueryParameters:true,
	        onready: skyboxReady
	      });
	      var canvases = krpano.display.viewerlayer.getElementsByTagName('canvas');
	      for(var c = 0; c < canvases.length; c++)
		      console.log(canvases[c].getContext('2d'));
    };
    
    skyboxReady = function(krpanoSkybox) {
	    skybox = krpanoSkybox;
			krpano.events.onviewchange = function(){
				skybox.set('view.hlookat', krpano.get('view.hlookat'));
				skybox.set('view.vlookat', krpano.get('view.vlookat'));
				skybox.set('view.fov',     krpano.get('view.fov')-depth);
			};
			krpano.events.onmousedown = krpano.events.onviewchange;
			krpano.events.onmousewheel = krpano.events.onmousedown;
    };
    
    local.unloadplugin = function() {
      plugin = null;
      krpano = null;
    };
    
    local.onresize = function(width, height) {
	    // Maybe if needed?
    };
    
};

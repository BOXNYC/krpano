/*
		Javascript API
    krpanoJS javascript plugin
*/

var krpanoplugin = function() {
		
		var local = this,
		    krpano = null;
    
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
        if(!pluginobject.enabled) return;
        krpano = krpanointerface;
        if(krpano.get('version') < '1.0.7') {
          krpano.call('error(jsapi plugin - wrong krpano version! 1.0.7 or higher needed);');
          return;
        };
        if(typeof krpanoJSAPI === 'undefined') {
	        krpano.call('error(jsapi plugin - krpanoJSAPI not found. Create this: var krpanoJSAPI = {init, resize, } );');
          return;
        };
        krpanoJSAPI.krpano = krpano;
        var hotspots = krpano.hotspot.getArray(),
		        hotSpotClassFormat = pluginobject.hotspotclassformat || 'krpano-hotspot';
		    for(var i in hotspots) hotspots[i].sprite.className = hotSpotClassFormat + ' ' + hotSpotClassFormat + '-' + i;
        if(typeof krpanoJSAPI.init === 'function') krpanoJSAPI.init.call(krpano, {
	        width: krpano.stagewidth,
	        height: krpano.stageheight
	      });
	      if(typeof krpanoJSAPI.hotSpots === 'function') {
		      var fragment = document.createDocumentFragment();
				  for(var i in hotspots) fragment.appendChild(hotspots[i].sprite.cloneNode());
		      krpanoJSAPI.hotSpots.call(krpano, {
		        hotSpots: hotspots,
		        elements: fragment.childNodes
		      });
		    };
	      if(typeof krpanoJSAPI.hotSpot === 'function') for(var i in hotspots) krpanoJSAPI.hotSpot.call(krpano, {
	        hotSpot: hotspots[i],
	        element: hotspots[i].sprite,
	        index: parseInt(i)
	      });
    };
    
    local.unloadplugin = function() {
      plugin = null;
      krpano = null;
    };
    
    local.onresize = function(width, height) {
	    if(typeof krpanoJSAPI.resize !== 'function') krpanoJSAPI.resize({
		    width: width,
		    height: height,
		    krpano: krpano
	    });
    };
    
};

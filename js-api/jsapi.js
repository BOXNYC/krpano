/*
		Javascript API
    krpanoJS javascript plugin
*/

var krpanoplugin = function() {
		
	var local = this,
			krpano = null,
			ID = '';
    
	local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
		if(!pluginobject.enabled) return;
		krpano = krpanointerface;
		if(krpano.get('version') < '1.0.7') {
			krpano.call('error(jsapi plugin - wrong krpano version! 1.0.7 or higher needed);');
				return;
			};
			if(typeof krpanoJSAPI === 'undefined') {
				krpano.call('error(jsapi plugin - krpanoJSAPI not found. Create this: var krpanoJSAPI = {ID:{init,resize,hotSpot,hotSpots}} );');
				return;
			};
			if(typeof pluginobject.id === 'undefined') {
				krpano.call('error(jsapi plugin - krpanoJSAPI[ID] not found. You must add an id attribute to the plugin);');
				return;
			};
      ID = pluginobject.id;
      var hotspots = krpano.hotspot.getArray(),
			hotSpotClassFormat = pluginobject.hotspotclassformat || 'krpano-hotspot';
			for(var i in hotspots) hotspots[i].sprite.className = hotSpotClassFormat + ' ' + hotSpotClassFormat + '-' + i;
      if(typeof krpanoJSAPI[ID].init === 'function') krpanoJSAPI[ID].init.call(krpano, {
				width: krpano.stagewidth,
				height: krpano.stageheight
			});
			if(typeof krpanoJSAPI[ID].hotSpots === 'function') {
				var fragment = document.createDocumentFragment();
				for(var i in hotspots) fragment.appendChild(hotspots[i].sprite.cloneNode());
				krpanoJSAPI[ID].hotSpots.call(krpano, {
					hotSpots: hotspots,
					elements: fragment.childNodes
				});
			};
			if(typeof krpanoJSAPI[ID].hotSpot === 'function') for(var i in hotspots) krpanoJSAPI[ID].hotSpot.call(krpano, {
				hotSpot: hotspots[i],
				element: hotspots[i].sprite,
				index: parseInt(i)
			});
			if(typeof krpanoJSAPI[ID].mouseOut === 'function') krpano.control.layer.addEventListener('mouseout', krpanoJSAPI[ID].mouseOut, true);
			if(typeof krpanoJSAPI[ID].mouseMove === 'function') krpano.control.layer.addEventListener('mousemove', krpanoJSAPI[ID].mouseMove, true);
			if(typeof krpanoJSAPI[ID].mouseDown === 'function') krpano.control.layer.addEventListener('mousedown', krpanoJSAPI[ID].mouseDown, true);
			if(typeof krpanoJSAPI[ID].mouseUp === 'function') krpano.control.layer.addEventListener('mouseup', krpanoJSAPI[ID].mouseUp, true);
			if(typeof krpanoJSAPI[ID].mouseWheel === 'function') krpano.control.layer.addEventListener('mousewheel', krpanoJSAPI[ID].mouseWheel, true);
    };
    
    local.unloadplugin = function() {
			plugin = null;
      krpano = null;
      if(typeof krpanoJSAPI[ID].mouseOut === 'function') krpano.control.layer.removeEventListener('mouseout', krpanoJSAPI[ID].mouseOut);
			if(typeof krpanoJSAPI[ID].mouseMove === 'function') krpano.control.layer.removeEventListener('mousemove', krpanoJSAPI[ID].mouseMove);
			if(typeof krpanoJSAPI[ID].mouseDown === 'function') krpano.control.layer.removeEventListener('mousedown', krpanoJSAPI[ID].mouseDown);
			if(typeof krpanoJSAPI[ID].mouseUp === 'function') krpano.control.layer.removeEventListener('mouseup', krpanoJSAPI[ID].mouseUp);
			if(typeof krpanoJSAPI[ID].mouseWheel === 'function') krpano.control.layer.removeEventListener('mousewheel', krpanoJSAPI[ID].mouseWheel);
    };
		
    local.onresize = function(width, height) {
			if(typeof krpanoJSAPI[ID].resize !== 'function') krpanoJSAPI[ID].resize({
				width: width,
				height: height,
				krpano: krpano
			});
    };
    
};

# krpano

## followmouse HTML5 plugin
krpano plugin for mouse-following camera yawing/pitching. XML:
```xml
<plugin name="followmouse" keep="true" enabled="true" alturl="plugins/followmouse/followmouse.js" url="plugins/followmouse/followmouse.swf"  />
```

## JavaScript API
Provides external access to krpano
```xml
<plugin name="jsapi" keep="true" url="plugins/js-api/jsapi.js" enabled="true" hotspotclassformat="hotspot" id="myKRPano" />
```
#### Useage
Add an object with methods
```javascript
var krpanoJSAPI = {};
krpanoJSAPI.myKRPano = {
  // Called when plugin registered
  init: function(event){
    // this : krpano
    // event.width : Stage width
    // event.height : Stage height
  },
  hotSpot: function(event){
    // this : krpano
    // hotSpot : hotSpot object
    // element : DOM element of hotSpot
  },
  hotSpots: function(event){
    // this : krpano
    // hotSpots : hotSpots object array
    // elements : DOM NodeList elements
  },
  resize: function(event){
    // this : krpano
    // event.width : Stage width
    // event.height : Stage height
  }
};
```
#### To do:
- Flash version support

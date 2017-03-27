# Gmap-React
# This lib in development process - don't use it!
Very simple gmap react wrapper-lib.

Example:

```javascript
  import React from 'react'

  import {Map, Marker} from 'gmap-react'

  const InteractiveMap = () => (
      <Map center={{ lat: 51.5258541, lng: -0.08040660000006028 }}
           zoom={14}
      >
          <Marker position={{lat: 51.5258541, lng: -0.08040660000006028}}
                  infoWindowContent="Some little part text"
          />
          <Marker position={{lat: 51.5158531, lng: -0.09040660000006011}}
                  infoWindowContent="Some little part text"
          />
      </Map>
  );

  export default InteractiveMap;
```

## Examples 

1) Simple map: https://developers.google.com/maps/documentation/javascript/examples/map-simple?hl=ru

```javascript
  import React from 'react'

  import {Map} from 'gmap-react'

  const InteractiveMap = () => (
      <Map center={{lat: -34.397, lng: 150.644}}
           zoom={8}
      />
  );

  export default InteractiveMap;
```

2) Styled map: https://developers.google.com/maps/documentation/javascript/examples/style-array?hl=ru

```javascript
  import React from 'react'

  import {Map, Marker} from 'gmap-react'

  const styleArray = [
      {
          featureType: 'all',
          stylers: [
              { saturation: -80 }
          ]
      },{
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
              { hue: '#00ffee' },
              { saturation: 50 }
          ]
      },{
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [
              { visibility: 'off' }
          ]
      }
  ];

  const InteractiveMap = () => (
      <Map center={{ lat: 40.6743890, lng: -73.9455 }}
           zoom={12}
           styles={styleArray}
      />
  );

  export default InteractiveMap;
```

3) Marker https://developers.google.com/maps/documentation/javascript/examples/marker-simple?hl=ru

```javascript
  import React from 'react'

  import {Map, Marker} from 'gmap-react'

  const coordinates = {lat: -25.363, lng: 131.044};

  const InteractiveMap = () => (
      <Map center={coordinates}
           zoom={4}
      >
          <Marker position={coordinates}
                  title="Hello World!"
          />
      </Map>
  );

  export default InteractiveMap;
```

4) InfoWindow https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=ru

Because info window always use the marker context it's realized as marker property

```javascript
  import React from 'react'

  import {Map, Marker} from 'gmap-react'

  const coordinates = {lat: -25.363, lng: 131.044};
  
  const contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  const InteractiveMap = () => (
      <Map center={coordinates}
           zoom={4}
      >
          <Marker position={coordinates}
                  infoWindowContent={contentString}
          />
      </Map>
  );

  export default InteractiveMap;
```

# How it works and why it so simple to use

Because all components props will put in gmap API

Example component "Map"

```javascript
  const GmapApi = this.props.gmaps;
  
  if (GmapApi.Map) {
      this.setState({
          mapInstance: new GmapApi.Map(
              document.getElementById('map'),
              {...this.props}
          )
      });
  }
```

As you can see app component props will be spread to GmapApi.Map params. So this approach allowed use the JSX syntax in context of Gmap API object.

Read the specification JS API GMap and use it in JSX syntax as props of component.
https://developers.google.com/maps/documentation/javascript/examples/?hl=ru

# Drow the geometry figures

5) Component "Geometry"

Is unified element which create all graphical objects in GMap. Main props this element is "type".
Let's see the source code of component "Geometry"

```javascript
  const GmapApi = this.context.gmaps;

  if (this.context.mapInstance) {
      this.figure = new GmapApi[this.props.type]({
          ...this.props
      });

      this.figure.setMap(this.context.mapInstance());
  }
  return null;
```

As you can see this simple JSX wrapper. We call the GmapApi[this.props.type] method and spread the component params. So we might use the power of JS Gmap API drow components.
Component "Geometry" allowed call the anythig method of GmapAPI.

### Examples
1) Simple polylines https://developers.google.com/maps/documentation/javascript/examples/polyline-simple?hl=ru

```javascript

```

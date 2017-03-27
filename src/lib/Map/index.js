/**
 * @flow
 */
import React, {PureComponent} from "react";
import loadGoogleMapsAPI from "load-google-maps-api";

import MapArea from "../MapArea";
import Coordinates from "../Types/Coordinates";

type Props = {
    zoom: number,
    center: Coordinates,
    domListeners?: Array<Event>,
    children?: any
};

export default class Map extends PureComponent {
    componentDidMount() {
        loadGoogleMapsAPI().then(
            googleMap => {
                this.googleMap = googleMap;
            }
        );
    }

    componentWillUnmount() {
        this.marker.setMap(null);
    }

    props: Props;

    googleMap: any;

    render() {
        return this.googleMap ? (
            <MapArea gmaps={this.googleMap}
                     {...this.props}
            >
                {this.props.children}
            </MapArea>
        ) : null;
    }
}

/**
 * @flow
 */
import React, {PureComponent} from "react";
import loadGoogleMapsAPI from "load-google-maps-api";

import Coordinates from "./Types/Coordinates";

type Props = {
    zoom: number,
    center: Coordinates,
    domListeners?: Array<Event>,
    children?: any
};

type State = {
    mapInstance: Object
}

export default class Map extends PureComponent {
    static childContextTypes = {
        gmaps: React.PropTypes.object,
        mapInstance: React.PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    state: State;

    getChildContext() {
        return {
            gmaps: this.googleMap,
            mapInstance: () => this.state.mapInstance
        };
    }

    componentDidMount() {
        loadGoogleMapsAPI().then(
            googleMap => {
                this.googleMap = googleMap;

                const GmapApi = this.googleMap;

                if (GmapApi.Map) {
                    const mapElement = document.getElementById('map');
                    this.setState({
                        mapInstance: new GmapApi.Map(
                            mapElement,
                            {...this.props}
                        )
                    });
                    if (this.props.domListeners && this.props.domListeners.length > 0) {
                        this.props.domListeners.forEach((listener) => {
                            GmapApi.event.addDomListener(
                                mapElement,
                                listener.type,
                                listener.handler
                            );
                        });
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        this.marker.setMap(null);
    }

    props: Props;

    googleMap: any;

    render() {
        return (
            <div id="map" style={{height: '100%'}}>
                {this.props.children}
            </div>
        );
    }
}

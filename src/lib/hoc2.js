/**
 * @flow
 */
import React from "react";
import loadGoogleMapsAPI from "load-google-maps-api";

type Props = {
    position: Coordinates,
    events: Array<Event>,
    gmaps: Object,
    infoWindowString?: string
};

type State = {
    mapInstance: Object
}

let GmapApi, GmapApiInstance;

const WithGmap = function (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        state: State;

        shouldComponentUpdate() {
            return this.state.mapInstance;
        }

        componentDidMount() {
            if (GmapApi) {
                this.setState({
                    mapInstance: GmapApiInstance
                });
            } else {
                loadGoogleMapsAPI().then(
                    googleMap => {
                        GmapApi = googleMap;
                        this.googleMap = googleMap;

                        if (GmapApi.Map) {
                            const mapElement = document.getElementById('map');
                            GmapApiInstance = new GmapApi.Map(
                                mapElement,
                                {...this.props}
                            );
                            this.setState({
                                mapInstance: GmapApiInstance
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
        }

        componentWillUnmount() {
            this.marker.setMap(null);
        }
    }
};

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

const WithGmap = function (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        state: State;

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
    }
};

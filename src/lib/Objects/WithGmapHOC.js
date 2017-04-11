/**
 * @flow
 */
import React from 'react'
import loadGoogleMapsAPI from 'load-google-maps-api'

import Coordinates from 'Types/Coordinates'
import Event from 'Types/Coordinates'

type Props = {
    position: Coordinates,
    domListeners?: Array<Event>,
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
                            this.props.center = this.props.hasOwnProperty('center') ?
                                this.props.center : this.props.position;

                            const mapElement = document.getElementById('map');
                            GmapApiInstance = new GmapApi.Map(
                                mapElement,
                                {...this.props}
                            );
                            this.setState({
                                mapInstance: GmapApiInstance
                            });
                            if (this.props.hasOwnProperty('domListeners') && this.props.domListeners.length > 0) {
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
            this.figure.setMap(null);
        }

        props: Props;
        state: State;
        infoWindow: any;
        figure: any;

        render() {
            const GmapApi = this.context.gmaps;
            const isFirstInit = !this.state.mapInstance;

            if (this.state.mapInstance) {
                this.figure = new GmapApi[this.props.type]({
                    map: this.state.mapInstance,
                    ...this.props
                });

                this.figure.setMap(this.context.mapInstance);

                if (this.props.events && this.props.events.length > 0) {
                    this.props.events.forEach((event) => {
                        this.figure.addListener(
                            event.type,
                            event.handler
                        );
                    })
                }

                if (this.props.infoWindowString) {
                    this.infoWindow = new GmapApi.InfoWindow({
                        content: this.props.infoWindowString
                    });

                    this.figure.addListener('click', () => {
                        this.infoWindow.open(
                            this.context.mapInstance,
                            this.figure
                        );
                    });
                }
            }

            return isFirstInit ?
                <div id="map"><WrappedComponent /></div> : <WrappedComponent />;
        }
    }
};

export default WithGmap;

/**
 * @flow
 */
import React, {PureComponent} from "react";

import Coordinates from "../Types/Coordinates";
import Event from "../Types/Event";

type Props = {
    center: Coordinates,
    zoom: number,
    gmaps: Object,
    domListeners?: Array<Event>
    children?: any
}

type State = {
    mapInstance: Object
}

export default class MapArea extends PureComponent {
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
            gmaps: this.props.gmaps,
            mapInstance: () => this.state.mapInstance
        };
    }

    componentDidMount() {
        const GmapApi = this.props.gmaps;

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

    props: Props;

    render() {
        return (
            <div id="map" style={{height: '100%'}}>
                {this.props.children}
            </div>
        )
    }
}

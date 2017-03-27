/**
 * @flow
 */
import React, {PureComponent} from 'react'
import './styles/index.styl';

type Props = {
    center: {
        lat: number,
        lng: number,
    },
    zoom: number,
    gmaps: Object,
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
            this.setState({
                mapInstance: new GmapApi.Map(
                    document.getElementById('map'),
                    {...this.props}
                )
            });
        }
    }

    props: Props;

    render() {
        return (
            <div id="map">
                {this.props.children}
            </div>
        )
    }
}

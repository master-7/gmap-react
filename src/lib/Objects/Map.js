import { Component } from 'react'

import WithGmap from './WithGmapHOC'

import Event from 'Types/Event'
import Coordinates from 'Types/Coordinates'

type Props = {
    zoom: number,
    center: Coordinates,
    domListeners?: Array<Event>,
    children?: any
};

const Map = WithGmap(class extends Component {
    props: Props;

    render() {
        return this.props.children;
    }
});

export default Map;

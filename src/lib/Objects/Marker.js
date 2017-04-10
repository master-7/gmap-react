import { Component } from 'react'

import WithGmap from './WithGmapHOC'

import Event from "Types/Event"
import Coordinates from "Types/Coordinates"

type Props = {
    position: Coordinates,
    events: Array<Event>,
    infoWindowString?: string
};

const Marker = WithGmap(class extends Component {
    props: Props;
});

export default Marker;

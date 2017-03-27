/**
 * @flow
 */
import React, {PureComponent} from "react";

import Event from "../Types/Event";

type Props = {
    type: string,
    events: Array<Event>,
    infoWindowString?: string
};

export default class Wrapper extends PureComponent {
    static contextTypes = {
        gmaps: React.PropTypes.object,
        mapInstance: React.PropTypes.any
    };

    shouldComponentUpdate() {
        return this.context.mapInstance;
    }

    componentWillUnmount() {
        this.figure.setMap(null);
    }

    figure: any;

    props: Props;

    render() {
        const GmapApi = this.context.gmaps;

        if (this.context.mapInstance) {
            this.figure = new GmapApi[this.props.type]({
                ...this.props
            });

            this.figure.setMap(this.context.mapInstance());

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
        return null;
    }
}

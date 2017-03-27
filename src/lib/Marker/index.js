/**
 * @flow
 */
import React, {PureComponent} from 'react'

type Props = {
    position: {
        lat: number,
        lng: number,
    },
    infoWindowContent?: any,
    onClick?: () => void,
    draggable?: boolean,
    icon?: string,
    animation?: any,
    props?: any
};

export default class Marker extends PureComponent {
    static contextTypes = {
        gmaps: React.PropTypes.object,
        mapInstance: React.PropTypes.any
    };

    shouldComponentUpdate() {
        return this.context.mapInstance;
    }

    componentWillUnmount() {
        this.marker.setMap(null);
    }

    marker: any;
    infoWindow: any;

    props: Props;

    render() {
        const GmapApi = this.context.gmaps;

        if (this.context.mapInstance) {
            this.marker = new GmapApi.Marker({
                map: this.context.mapInstance(),
                ...this.props
            });

            if (this.props.onClick) {
                this.marker.addListener('click', this.props.onClick);
            }

            if (this.props.infoWindowContent) {
                this.infoWindow = new GmapApi.InfoWindow({
                    content: this.props.infoWindowContent
                });

                this.marker.addListener('click', () => {
                    this.infoWindow.open(
                        this.context.mapInstance,
                        this.marker
                    );
                });
            }
        }
        return null;
    }
}

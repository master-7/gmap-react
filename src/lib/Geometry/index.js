/**
 * @flow
 */
import React, {PureComponent} from 'react'

type Props = {
    type: string
};

export default class Geometry extends PureComponent {
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
        }
        return null;
    }
}

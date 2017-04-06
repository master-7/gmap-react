import withGmap from './hoc';

const Marker = withGmap(
    CommentList,
    (DataSource) => DataSource.getComments()
);

export default {Marker}
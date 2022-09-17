import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
    return comments.map(comment => (
        <Comment
            key={comment._id}
            onRemove={onRemove}
            {...comment}
        />
    ));
};

CommentsList.propTypes = {
    comment: PropTypes.array,
    onRemove: PropTypes.func
};

export default CommentsList;

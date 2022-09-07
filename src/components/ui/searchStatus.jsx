import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (num) => {
        if (num === 1 || num > 4) {
            return "человек тусанет";
        } else {
            return "человека тусанут";
        }
    };

    const isEmptyList = length === 0;
    const classNames = `badge bg-${isEmptyList ? "danger" : "primary"} m-2`;
    const content = isEmptyList ? "Никто с тобой не тусанет" : `${length} ${renderPhrase(length)} с тобой сегодня`;

    return (
        <h2>
            <span className={classNames}>
                {content}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;

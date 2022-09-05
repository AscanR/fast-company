import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map(
                (quality) => {
                    return <Quality
                        id={quality._id}
                        name={quality.name}
                        color={quality.color}
                        key={quality._id}
                    />
                })}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList

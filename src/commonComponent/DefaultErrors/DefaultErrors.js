import React from 'react';

const DefaultErrors = (props) => {
    const {status, code} = props.data;

    return (
        <div>
            <h1>Error {status}</h1>
            <strong>code: {code}</strong>
        </div>
    );
};

export default DefaultErrors;
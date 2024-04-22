import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Motorcycle Parts & Services`}</title>
        </Helmet>
    )
}

export default MetaData
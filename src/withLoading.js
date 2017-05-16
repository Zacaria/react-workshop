import React from 'react';

const withLoading = Component => ({loading, data, ...props}) => (
    loading ? <div {...props}>Loading …</div> :
    <Component {...props} data={data} loading={loading} />
);

export default withLoading;

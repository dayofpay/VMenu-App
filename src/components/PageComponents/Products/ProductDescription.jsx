import React from 'react';

const ProductDescription = ({ description }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default ProductDescription;

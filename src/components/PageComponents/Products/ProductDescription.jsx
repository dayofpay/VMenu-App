import React from 'react';
import '../../Styles/CKContent.css'
const ProductDescription = ({ description }) => {
  return (
    <div className='ck-content' dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default ProductDescription;

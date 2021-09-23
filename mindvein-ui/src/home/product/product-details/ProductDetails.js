import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// import Calendar from 'react-input-calendar';

const PRODUCT_QUERY = gql`
  query getNote($_id: ID!) {
    getNote(_id: $_id) {
      _id
      title
      content
      image
      price
      date
    }
  }
`;

const ProductDetails = withRouter(({ match }) => {
  console.log(match);

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  if (loading) return <div>Fetching Product details</div>;
  if (error) return <div>Error fetching  Product details</div>;

  // set the  result gotten from the GraphQL server into the details variable.
  console.log('product details data', data);
  return (
    <div>
      ProductDetails
    </div>
  );
});

export default ProductDetails;

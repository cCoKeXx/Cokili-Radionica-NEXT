
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// importing our schemas
import featureProducts from './featureProducts';
import subProduct from './products';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    featureProducts,
    subProduct,
  ]),
})

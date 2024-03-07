import DefaultQuery from '../misc.gql';

const ViewGridCardsQuery = `
  ${DefaultQuery}
  name
  itemsPerRow
  alignment
`;

export default ViewGridCardsQuery;

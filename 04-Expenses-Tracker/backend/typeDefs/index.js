import { mergeTypeDefs } from '@graphql-tools/merge/typedefs-mergers/merge-typedefs';

import userTypeDef from './user.typeDef.js';
import transactionTypeDef from './transaction.typeDef.js';

const mergedTypeDef = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDef;

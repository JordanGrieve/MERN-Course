import Transaction from '../models/transaction.model.js';

const transactionResolvers = {
  Query: {
    transactions: async (_, context) => {
      try {
        if (!context.getUser()) throw new Error('Unauthenticated');
        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (e) {
        console.log('Error fetching transactions:', e);
        throw new Error(e);
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (e) {
        console.log('Error fetching transaction:', e);
        throw new Error(e);
      }
    },
    // TODO add category based transaction fetching
  },
  Mutation: {},
};
export default transactionResolvers;

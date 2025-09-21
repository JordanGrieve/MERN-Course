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
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
      } catch (e) {
        console.log('Error creating transaction:', e);
        throw new Error(e);
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
          new: true,
        });
        return updateTransaction;
      } catch (e) {
        console.log('Error updating transaction:', e);
        throw new Error(e);
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransactoion = await Transaction.findByIdAndDelete(transactionId);
        return deleteTransactoion;
      } catch (e) {
        console.log('Error deleting transaction:', e);
        throw new Error(e);
      }
    },
  },
  // TODO add transaction / user relationship
};
export default transactionResolvers;

import Card from './Card.jsx';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../../graphql/queries/transaction.query.js';

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);

  console.log(data);

  //TODO add relationship between user and transaction to fetch only the authenticated user's transactions
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card key={transaction._id} transaction={transaction} />
          ))}
      </div>
      {!loading && data?.transactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};
export default Cards;

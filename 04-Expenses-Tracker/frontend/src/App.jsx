import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import SignUpPage from './components/pages/SignUpPage.jsx';
import TransactionPage from './components/pages/TransactionPage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import Header from './components/ui/Header.jsx';

function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

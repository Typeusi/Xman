import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecordsPage from './pages/RecordsPage';
import { RecordProvider } from './context/RecordContext';

function App() {
  return (
    <RecordProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/records" element={<RecordsPage />} />
          </Routes>
        </Layout>
      </Router>
    </RecordProvider>
  );
}

export default App;
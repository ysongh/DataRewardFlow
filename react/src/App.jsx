import { HashRouter, Route, Routes } from 'react-router-dom';

import { ETHProvider } from './ETHContext';
import Navbar from './components/Navbar';
import DataCampaignsList from './pages/DataCampaignsList';
import DataMarketplaceForm from './pages/DataMarketplaceForm';

function App() {

  return (
    <ETHProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/create-marketplace"
            element={<DataMarketplaceForm />} />
          <Route
            path="/"
            element={<DataCampaignsList />} />
        </Routes>
      </HashRouter>
    </ETHProvider>
  )
}

export default App

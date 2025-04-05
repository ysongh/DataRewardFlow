import { HashRouter, Route, Routes } from 'react-router-dom';

import DataCampaignsList from './pages/DataCampaignsList';
import DataMarketplaceForm from './pages/DataMarketplaceForm';

function App() {

  return (
    <HashRouter>
       <Routes>
         <Route
           path="/create-marketplace"
           element={<DataMarketplaceForm />} />
         <Route
           path="/"
           element={<DataCampaignsList />} />
       </Routes>
     </HashRouter>
  )
}

export default App

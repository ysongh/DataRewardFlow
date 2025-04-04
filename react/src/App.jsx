import { HashRouter, Route, Routes } from 'react-router-dom';

import DataMarketplaceForm from './pages/DataMarketplaceForm';

function App() {

  return (
    <HashRouter>
       <Routes>
         <Route
           path="/test"
           element={<h1>Test</h1>} />
         <Route
           path="/"
           element={<DataMarketplaceForm />} />
       </Routes>
     </HashRouter>
  )
}

export default App

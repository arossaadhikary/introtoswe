import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import UserProfile from './pages/user-profile/UserProfile';
import Search from './pages/search/Search';

// Components
import Nav from './components/nav-bar/Navbar';
import Footer from './components/footer/Footer';
import MakeListingDialog from './components/make-listing/MakeListingDialog';

function App() {
  const [openMakeListingDialog, setOpenMakeListingDialog] = useState(false);

  const handleOpenMakeListingDialog = () => setOpenMakeListingDialog(true);
  const handleCloseMakeListingDialog = () => setOpenMakeListingDialog(false);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <Nav />

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/john_user_profile"
          element={<UserProfile onOpenMakeListing={handleOpenMakeListingDialog} />}
        />
        <Route path="/search" element={<Search />} />
      </Routes>

      {/* Footer */}
      <Footer onMakeListingClick={handleOpenMakeListingDialog} />

      {/* MakeListingDialog */}
      <MakeListingDialog
        open={openMakeListingDialog}
        onClose={handleCloseMakeListingDialog}
      />
    </div>
  );
}

export default App;

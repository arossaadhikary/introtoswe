import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import UserProfile from './pages/user-profile/UserProfile';

// components
import Nav from './components/nav-bar/Navbar';
import Footer from './components/footer/Footer';
import MakeListingDialog from './components/make-listing/MakeListingDialog';

function App() {
  // State for MakeListingDialog
  const [openMakeListingDialog, setOpenMakeListingDialog] = useState(false);

  // Handlers for MakeListingDialog
  const handleOpenMakeListingDialog = () => setOpenMakeListingDialog(true);
  const handleCloseMakeListingDialog = () => setOpenMakeListingDialog(false);

  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Pass the handler for opening the dialog to the UserProfile */}
      <Route 
          path="/john_user_profile" 
          element={<UserProfile onOpenMakeListing={handleOpenMakeListingDialog} />} 
        />
      </Routes>

      {/* Footer with the handler to open MakeListingDialog */}
      <Footer onMakeListingClick={handleOpenMakeListingDialog} />

      {/* MakeListingDialog component */}
      <MakeListingDialog
        open={openMakeListingDialog}
        onClose={handleCloseMakeListingDialog}
      />
    </div>
  );
}

export default App;

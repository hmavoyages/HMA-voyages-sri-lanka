import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import GuidePage from './pages/GuidePage';
import PracticalInfoPage from './pages/PracticalInfoPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/Gallery';
import Feedbacks from './components/Testimonials';
import './App.css';

import ItinerarySL12Days from './pages/Tours/12 Days';
import ItinerarySL16Days from './pages/Tours/16 Days';
import ItinerarySL18Days from './pages/Tours/18 Days';
import ItineraryColomboDayTour from './pages/Tours/Colombo';
import ItineraryNegomboDayTour from './pages/Tours/Negombo';
import ItineraryGalleDayTour from './pages/Tours/Galle';
import ItineraryKandyDayTour from './pages/Tours/Kandy';
import ItinerarySigiriyaDambullaDayTour from './pages/Tours/Sigiriya';
import ItineraryYalaNationalParkDayTour from './pages/Tours/Yala';
import ReviewsAdmin from './Admin/ReviewsAdmin';
import GalleryAdmin from './Admin/GalleryAdmin';
import RequireAdmin from './components/RequireAdmin';
import TourPackagesAdmin from "./Admin/TourPackagesAdmin";
import ItineraryDetail from "./pages/DayDetails";

import WhatsAppFloat from './components/WhatsAppFloat';
import UploadsGallery from './Admin/Images';


const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/d12" element={<ItinerarySL12Days />} />
            <Route path="/tours/d16" element={<ItinerarySL16Days />} />
            <Route path="/tours/d18" element={<ItinerarySL18Days />} />
            <Route path="/tours/colombo" element={<ItineraryColomboDayTour />} />
            <Route path="/tours/negombo" element={<ItineraryNegomboDayTour />} />
            <Route path="/tours/galle" element={<ItineraryGalleDayTour />} />
            <Route path="/tours/kandy" element={<ItineraryKandyDayTour />} />
            <Route path="/tours/sigiriya" element={<ItinerarySigiriyaDambullaDayTour />} />
            <Route path="/tours/yala" element={<ItineraryYalaNationalParkDayTour />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/practical-info" element={<PracticalInfoPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/admin/reviews" element={<RequireAdmin> <ReviewsAdmin /> </RequireAdmin>} />
            <Route path="/admin/gallery" element={<RequireAdmin> <GalleryAdmin /> </RequireAdmin>} />
            <Route path="/admin/tours"element={<RequireAdmin> <TourPackagesAdmin /> </RequireAdmin> } />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/:tourId" element={<ItineraryDetail />} />
            <Route path="/admin/uploads" element={<RequireAdmin> <UploadsGallery /> </RequireAdmin>} />


          </Routes>
        </MainContent>
        <WhatsAppFloat />
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;

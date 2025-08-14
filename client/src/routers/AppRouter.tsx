import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import LearningPage from '../pages/LearningPage';
import ProtectedRoute from './ProtectedRoute';
import AllAudiosPage from '../pages/AllAudiosPage';
import FavoriteAudiosPage from '../pages/FavoriteAudiosPage';
import PresentationPage from '../pages/PresentationPage';
import PublicRoute from './PublicRoute';
import AudioPage from '../pages/AudioPage';
import ProfilePage from '../pages/ProfilePage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/'>
            <Route 
              index 
              element={
                <PublicRoute>
                  <PresentationPage />
                </PublicRoute>
              }
            />
            <Route
              path='home'
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route 
              path='learning' 
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path='all-audios' 
              element={
                <ProtectedRoute>
                  <AllAudiosPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path='favorite-audios' 
              element={
                <ProtectedRoute>
                  <FavoriteAudiosPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path='audio/:audioId' 
              element={
                <ProtectedRoute>
                  <AudioPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path='profile/:profileUserId'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import LearningPage from '../pages/LearningPage';
import ProtectedRoute from './ProtectedRoute';
import AllAudiosPage from '../pages/AllAudiosPage';
import PresentationPage from '../pages/PresentationPage';
import PublicRoute from './PublicRoute';

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
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
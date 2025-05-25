import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import LearningPage from '../pages/LearningPage';
import ProtectedRoute from './ProtectedRoute';
import AllAudiosPage from '../pages/AllAudiosPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/'>
            <Route
              index
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
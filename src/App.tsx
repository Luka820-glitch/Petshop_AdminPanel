import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AnimalsPage from './pages/Animals/AnimalsPage'
import AddAnimalsPage from './pages/Animals/AddAnimalsPage'
import CategoriesPage from './pages/Categories/CategoriesPage'
import AddCategoriesPage from './pages/Categories/AddCategoriesPage'
import EditAnimalsPage from './pages/Animals/EditAnimalsPage'
import EditCategoriesPage from './pages/Categories/EditCategoriesPage'
import AnimalsWithCategoriesPage from './pages/AnimalsWithCategories/AnimalsWithCategoriesPage'
import type React from 'react'

const App: React.FC = () =>{
 
  return (
    <BrowserRouter>
      <nav className="navigation">
        <Link to="/animals">Animals</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/animals_with_categories">Animals With Categories</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/"/>}/>
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/animals/add" element={<AddAnimalsPage />} />
        <Route path="/animals/edit/:animalsId" element={<EditAnimalsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/add" element={<AddCategoriesPage />} />
        <Route path="/categories/edit/:categoriesId" element={<EditCategoriesPage/>}/>
        <Route path="/animals_with_categories" element={<AnimalsWithCategoriesPage/>}/>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App

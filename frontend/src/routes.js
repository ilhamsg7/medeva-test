import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeCreateOrEdit from './pages/EmployeeCreateOrEdit';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employee/create" element={<EmployeeCreateOrEdit />} />
        <Route path="/employee/edit/:id" element={<EmployeeCreateOrEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

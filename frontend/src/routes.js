import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/employee';
import EmployeeCreateOrEdit from './pages/employee/form';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee/create" element={<EmployeeCreateOrEdit />} />
        <Route path="/employee/edit/:id" element={<EmployeeCreateOrEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

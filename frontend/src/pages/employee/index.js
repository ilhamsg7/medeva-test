import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container">
      <h3>Daftar Karyawan</h3>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/employee/create")}
      >
        Tambah Karyawan
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Nama Lengkap</th>
            <th>Nomor Identitas</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.namaLengkap}</td>
              <td>{emp.nomorIdentitas}</td>
              <td>{emp.role}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/employee/edit/${emp.id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

// src/pages/EmployeeCreateOrEdit.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";

const EmployeeCreateOrEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    namaLengkap: "",
    nomorIdentitas: "",
    jenisKelamin: "",
    tanggalLahir: "",
    username: "",
    password: "",
    role: "",
    file: null,
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      // artinya mode edit
      setIsEdit(true);
      getEmployeeById(id)
        .then((data) => {
          setInitialValues({
            namaLengkap: data.namaLengkap,
            nomorIdentitas: data.nomorIdentitas,
            jenisKelamin: data.jenisKelamin,
            tanggalLahir: data.tanggalLahir,
            username: data.username,
            password: "",
            role: data.role,
            file: null,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleSubmit = (formData) => {
    if (isEdit) {
      updateEmployee(id, formData)
        .then(() => {
          alert("Data karyawan berhasil diperbarui!");
          navigate("/employees");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      createEmployee(formData)
        .then(() => {
          alert("Data karyawan berhasil ditambahkan!");
          navigate("/employees");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="container">
      <h3>{isEdit ? "Edit Karyawan" : "Tambah Karyawan"}</h3>
      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </div>
  );
};

export default EmployeeCreateOrEdit;

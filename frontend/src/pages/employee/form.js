import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/employeeForm";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

const EmployeeCreateOrEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    nama_lengkap: "",
    nomor_identitas: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    username: "",
    password: "",
    role: "",
    file: null,
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      getEmployeeById(id)
        .then((data) => {
          setInitialValues({
            nama_lengkap: data.namaLengkap,
            nomor_identitas: data.nomorIdentitas,
            jenis_kelamin: data.jenisKelamin,
            tanggal_lahir: data.tanggalLahir.split('T')[0],
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
    console.log('Form Data to Submit:', [...formData.entries()]);
    
    const processSubmission = isEdit 
      ? updateEmployee(id, formData)
      : createEmployee(formData);

    processSubmission
      .then(() => {
        alert(`Data karyawan berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
        navigate("/employee");
      })
      .catch((err) => {
        console.error('Submission Error:', err);
        alert("Terjadi kesalahan saat menyimpan data");
      });
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
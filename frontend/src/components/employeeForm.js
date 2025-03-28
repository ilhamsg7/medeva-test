// src/components/EmployeeForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";

const EmployeeForm = ({ initialValues, onSubmit, isEdit }) => {
  const validationSchema = Yup.object({
    namaLengkap: Yup.string().required("Nama Lengkap wajib diisi"),
    nomorIdentitas: Yup.string().required("Nomor Identitas wajib diisi"),
    // Tambahkan field lain sesuai kebutuhan
    // ...
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Siapkan formData untuk file upload
      const formData = new FormData();
      formData.append("namaLengkap", values.namaLengkap);
      formData.append("nomorIdentitas", values.nomorIdentitas);
      formData.append("jenisKelamin", values.jenisKelamin);
      formData.append("tanggalLahir", values.tanggalLahir);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("role", values.role);

      // Jika ada file (foto, dsb.)
      if (values.file) {
        formData.append("file", values.file);
      }

      onSubmit(formData);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="p-3">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              name="namaLengkap"
              value={formik.values.namaLengkap}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.namaLengkap && formik.errors.namaLengkap
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.namaLengkap}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nomor Identitas</Form.Label>
            <Form.Control
              type="text"
              name="nomorIdentitas"
              value={formik.values.nomorIdentitas}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.nomorIdentitas && formik.errors.nomorIdentitas
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nomorIdentitas}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Jenis Kelamin</Form.Label>
            <Form.Check
              type="radio"
              label="Laki-laki"
              name="jenisKelamin"
              value="laki-laki"
              checked={formik.values.jenisKelamin === "laki-laki"}
              onChange={formik.handleChange}
            />
            <Form.Check
              type="radio"
              label="Perempuan"
              name="jenisKelamin"
              value="perempuan"
              checked={formik.values.jenisKelamin === "perempuan"}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Lahir</Form.Label>
            <Form.Control
              type="date"
              name="tanggalLahir"
              value={formik.values.tanggalLahir}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="">Pilih Role</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="pegawai">Pegawai</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Upload File (opsional)</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        {isEdit ? "Update" : "Simpan"}
      </Button>
    </Form>
  );
};

export default EmployeeForm;

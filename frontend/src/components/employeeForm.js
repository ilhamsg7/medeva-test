import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";

const EmployeeForm = ({ initialValues, onSubmit, isEdit }) => {
  const validationSchema = Yup.object({
    nama_lengkap: Yup.string()
      .required("Nama Lengkap wajib diisi")
      .min(3, "Nama Lengkap minimal 3 karakter")
      .max(100, "Nama Lengkap maksimal 100 karakter"),

    nomor_identitas: Yup.string()
      .required("Nomor Identitas wajib diisi")
      .matches(/^[0-9]+$/, "Nomor Identitas hanya boleh berisi angka")
      .min(8, "Nomor Identitas minimal 8 karakter")
      .max(20, "Nomor Identitas maksimal 20 karakter"),

    jenis_kelamin: Yup.string()
      .required("Jenis Kelamin wajib diisi")
      .oneOf(
        ["Laki-laki", "Perempuan"],
        "Jenis Kelamin harus 'Laki-laki' atau 'Perempuan'"
      ),

    tanggal_lahir: Yup.date()
      .required("Tanggal Lahir wajib diisi")
      .max(new Date(), "Tanggal Lahir tidak boleh di masa depan"),

    username: Yup.string()
      .required("Username wajib diisi")
      .min(5, "Username minimal 5 karakter")
      .max(50, "Username maksimal 50 karakter"),

    password: Yup.string()
      .required(!isEdit && "Password wajib diisi")
      .min(8, "Password minimal 8 karakter"),

    role: Yup.string()
      .required("Role wajib diisi")
      .oneOf(["admin", "manager", "pegawai"], "Role harus sesuai pilihan"),

    file: Yup.mixed()
      .nullable() // Explicitly allow null
      .test(
        "fileFormat",
        "File harus berupa JPG, JPEG, PNG, atau PDF",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "application/pdf"].includes(value.type))
      )
      .test(
        "fileSize",
        "File terlalu besar, maksimal 5MB",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 5MB
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "file") {
          if (value) formData.append(key, value);
        } else if (key === "password" && isEdit && !value) {
        } else {
          formData.append(key, value);
        }
      });

      console.log("Form Values:", values);
      console.log("Form Data:", [...formData.entries()]);

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
              name="nama_lengkap"
              {...formik.getFieldProps("nama_lengkap")}
              isInvalid={
                formik.touched.nama_lengkap && formik.errors.nama_lengkap
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nama_lengkap}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nomor Identitas</Form.Label>
            <Form.Control
              type="text"
              name="nomor_identitas"
              {...formik.getFieldProps("nomor_identitas")}
              isInvalid={
                formik.touched.nomor_identitas && formik.errors.nomor_identitas
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nomor_identitas}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Jenis Kelamin</Form.Label>
            <div className="mt-2">
              <Form.Check
                inline
                type="radio"
                label="Laki-laki"
                name="jenis_kelamin"
                id="jenis_kelamin_laki"
                value="Laki-laki"
                checked={formik.values.jenis_kelamin === "Laki-laki"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.jenis_kelamin && formik.errors.jenis_kelamin
                }
              />
              <Form.Check
                inline
                type="radio"
                label="Perempuan"
                name="jenis_kelamin"
                id="jenis_kelamin_perempuan"
                value="Perempuan"
                checked={formik.values.jenis_kelamin === "Perempuan"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.jenis_kelamin && formik.errors.jenis_kelamin
                }
              />
            </div>
            {formik.touched.jenis_kelamin && formik.errors.jenis_kelamin && (
              <div className="text-danger mt-1" style={{ fontSize: "0.875em" }}>
                {formik.errors.jenis_kelamin}
              </div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Lahir</Form.Label>
            <Form.Control
              type="date"
              name="tanggal_lahir"
              {...formik.getFieldProps("tanggal_lahir")}
              isInvalid={
                formik.touched.tanggal_lahir && formik.errors.tanggal_lahir
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.tanggal_lahir}
            </Form.Control.Feedback>
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
              {...formik.getFieldProps("username")}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
            {isEdit && (
              <Form.Text className="text-muted">
                Kosongkan jika tidak ingin mengubah password
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              {...formik.getFieldProps("role")}
              isInvalid={formik.touched.role && formik.errors.role}
            >
              <option value="">Pilih Role</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="pegawai">Pegawai</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.role}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Upload File (opsional)</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(event) => {
                // Handle null ketika file di-remove
                const file = event.currentTarget.files[0] || null;
                formik.setFieldValue("file", file);
              }}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.file && formik.errors.file}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.file}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Format: JPG, PNG, PDF (Maks. 5MB)
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        {isEdit ? "Update" : "Simpan"}
      </Button>
    </Form>
  );
};

export default EmployeeForm;

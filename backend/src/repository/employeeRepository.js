const pool = require("../config/db");
const Employee = require("../domain/employee");

class EmployeeRepository {
  static async findAll() {
    const result = await pool.query("SELECT * FROM employees");
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  static async create(employeeData) {
    const {
      namaLengkap,
      nomorIdentitas,
      jenisKelamin,
      tanggalLahir,
      username,
      password,
      role,
      filePath,
    } = employeeData;

    const result = await pool.query(
      `INSERT INTO employees
       (nama_lengkap, nomor_identitas, jenis_kelamin, tanggal_lahir, username, password, role, file_path)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        namaLengkap,
        nomorIdentitas,
        jenisKelamin,
        tanggalLahir,
        username,
        password,
        role,
        filePath,
      ]
    );

    return result.rows[0];
  }

  static async update(id, employeeData) {
    const {
      namaLengkap,
      nomorIdentitas,
      jenisKelamin,
      tanggalLahir,
      username,
      password,
      role,
      filePath,
    } = employeeData;

    const result = await pool.query(
      `UPDATE employees
       SET nama_lengkap=$1, nomor_identitas=$2, jenis_kelamin=$3, tanggal_lahir=$4, 
           username=$5, password=$6, role=$7, file_path=$8
       WHERE id=$9 RETURNING *`,
      [
        namaLengkap,
        nomorIdentitas,
        jenisKelamin,
        tanggalLahir,
        username,
        password,
        role,
        filePath,
        id,
      ]
    );

    return result.rows[0];
  }
}

module.exports = EmployeeRepository;

// src/controller/employeeController.js
const EmployeeRepository = require('../repository/employeeRepository');

class EmployeeController {
  static async getAll(req, res) {
    try {
      const employees = await EmployeeRepository.findAll();
      return res.json(employees);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async getById(req, res) {
    try {
      const { id } = req.params;
      const employee = await EmployeeRepository.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.json(employee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async create(req, res) {
    try {
      const filePath = req.file ? req.file.path : null;
      const data = {
        nama_lengkap: req.body.nama_lengkap,
        nomor_identitas: req.body.nomor_identitas,
        jenis_kelamin: req.body.jenis_kelamin,
        tanggal_lahir: req.body.tanggal_lahir,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        file_path: filePath,
      };

      await EmployeeRepository.create(data);
      return res.json({
          message: "Created Employee Successfully"
        });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
        const { id } = req.params;
        const filePath = req.file ? req.file.path : undefined;
        const data = {};

        if (req.body.nama_lengkap) data.nama_lengkap = req.body.nama_lengkap;
        if (req.body.nomor_identitas) data.nomor_identitas = req.body.nomor_identitas;
        if (req.body.jenis_kelamin) data.jenis_kelamin = req.body.jenis_kelamin;
        if (req.body.tanggal_lahir) data.tanggal_lahir = req.body.tanggal_lahir;
        if (req.body.username) data.username = req.body.username;
        if (req.body.password) data.password = req.body.password;
        if (req.body.role) data.role = req.body.role;
        if (filePath) data.file_path = filePath;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Tidak ada data yang dikirim untuk update' });
        }

        const updatedEmployee = await EmployeeRepository.update(id, data);
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.json({
          message: "Updated Employee Successfully"
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedEmployee = await EmployeeRepository.delete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmployeeController;

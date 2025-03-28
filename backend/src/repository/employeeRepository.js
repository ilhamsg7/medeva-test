// src/repository/employeeRepository.js
const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");

class EmployeeRepository {
  static async findAll() {
    return prisma.employee.findMany();
  }

  static async findById(id) {
    return prisma.employee.findUnique({
      where: { id: Number(id) },
    });
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.employee.create({
      data: {
        namaLengkap: data.nama_lengkap,
        nomorIdentitas: data.nomor_identitas,
        jenisKelamin: data.jenis_kelamin,
        tanggalLahir: new Date(data.tanggal_lahir),
        username: data.username,
        password: hashedPassword,
        role: data.role,
        filePath: data.file_path || null,
      },
    });
  }

  static async update(id, data) {
    const updateData = {};

    if (data.nama_lengkap) updateData.namaLengkap = data.nama_lengkap;
    if (data.nomor_identitas) updateData.nomorIdentitas = data.nomor_identitas;
    if (data.jenis_kelamin) updateData.jenisKelamin = data.jenis_kelamin;
    if (data.tanggal_lahir)
      updateData.tanggalLahir = new Date(data.tanggal_lahir);
    if (data.username) updateData.username = data.username;
    if (data.role) updateData.role = data.role;
    if (data.file_path) updateData.filePath = data.file_path;

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.employee.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  static async delete(id) {
    return prisma.employee.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = EmployeeRepository;

const EmployeeRepository = require("../repository/employeeRepository");
const yup = require("yup");

const employeeSchema = yup.object().shape({
  namaLengkap: yup.string().required(),
  nomorIdentitas: yup.string().required(),
  jenisKelamin: yup.string().oneOf(["laki-laki", "perempuan"]).required(),
  tanggalLahir: yup.date().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().oneOf(["manager", "admin", "pegawai"]).required(),
  filePath: yup.string().nullable(),
});

class EmployeeUsecase {
  static async getAllEmployees() {
    return EmployeeRepository.findAll();
  }

  static async getEmployeeById(id) {
    return EmployeeRepository.findById(id);
  }

  static async createEmployee(data) {
    await employeeSchema.validate(data);
    return EmployeeRepository.create(data);
  }

  static async updateEmployee(id, data) {
    await employeeSchema.validate(data);
    return EmployeeRepository.update(id, data);
  }
}

module.exports = EmployeeUsecase;

class Employee {
    constructor({
      id,
      namaLengkap,
      nomorIdentitas,
      jenisKelamin,
      tanggalLahir,
      username,
      password,
      role,
      filePath,
    }) {
      this.id = id;
      this.namaLengkap = namaLengkap;
      this.nomorIdentitas = nomorIdentitas;
      this.jenisKelamin = jenisKelamin;
      this.tanggalLahir = tanggalLahir;
      this.username = username;
      this.password = password; 
      this.role = role;
      this.filePath = filePath;
    }
  }
  
  module.exports = Employee;
  

# Cara Clone dan Menjalankan Project




## Installation Frontend

1. Persiapan

npm install untuk menginstall semua dependency.

2. Pastikan file .env atau konfigurasi baseURL di axiosInstance.js mengarah ke backend.

Menjalankan Aplikasi

3. npm start akan menjalankan di http://localhost:3000 (default React).

Struktur Folder: (jelaskan secara ringkas)

Jika diaktifkan, set token di localStorage: localStorage.setItem('dummyToken', 'dummyToken123')

## Installation Backend

1. Persiapan

npm install untuk menginstall dependency.

2. Pastikan PostgreSQL berjalan dan sesuaikan config/db.js.

3. Menjalankan Aplikasi

node src/index.js atau npm run start (jika ada script di package.json).

Server berjalan di http://localhost:3000 (bisa disesuaikan).

4. Endpoint:

GET /api/employee : Ambil semua karyawan

GET /api/employee/:id : Ambil detail karyawan berdasarkan ID

POST /api/employee : Tambah karyawan (form-data, field file untuk upload)

PUT /api/employee/:id : Update karyawan (form-data, field file untuk upload)

5. Validasi:

Menggunakan Yup di usecase.

Validasi file upload di middleware/fileUploadValidation.js.

6. Dummy Authorization (opsional):

Tambahkan app.use(dummyAuth) di index.js atau panggil di setiap route.

Set header Authorization: Bearer dummyToken123.
    
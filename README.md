
# Cara Clone dan Menjalankan Project




## Installation Frontend

1. Persiapan

npm install untuk menginstall semua dependency.

2. Pastikan file .env atau konfigurasi REACT_APP_URL_BACKEND di axiosInstance.js mengarah ke backend.

Menjalankan Aplikasi

3. npm start akan menjalankan di http://localhost:3001 (default React).


## Installation Backend

1. Persiapan

npm install untuk menginstall dependency.

2. Pastikan Konfigurasi prisma dan postgreSQL pada schema.prisma. Lalu jalankan perintah berikut
 
npx prisma migrate dev --name init
npx prisma generate


3. Menjalankan Aplikasi

node src/index.js atau npm run start (jika ada script di package.json).

Server berjalan di http://localhost:3000 (bisa disesuaikan).

4. Endpoint:

GET /api/employee : Ambil semua karyawan

GET /api/employee/:id : Ambil detail karyawan berdasarkan ID

POST /api/employee : Tambah karyawan (form-data, field file untuk upload)

POST /api/employee/:id : Update karyawan (form-data, field file untuk upload)

5. Validasi:

Menggunakan Yup.

Validasi file upload di middleware/fileUploadValidation.js.

    

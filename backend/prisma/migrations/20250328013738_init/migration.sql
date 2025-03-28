-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "nomor_identitas" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "file_path" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

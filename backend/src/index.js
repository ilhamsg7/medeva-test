const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(dummyAuth); // jika ingin pakai dummy auth untuk semua route

app.use('/api/employee', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

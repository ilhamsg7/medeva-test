const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/employeeController');
const upload = require('../middleware/fileUploadValidation');
// const dummyAuth = require('../middleware/dummyAuth');

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.post('/', upload.single('file'), EmployeeController.create);
router.put('/:id', upload.single('file'), EmployeeController.update);

module.exports = router;

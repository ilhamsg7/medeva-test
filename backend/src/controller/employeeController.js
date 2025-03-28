const EmployeeUsecase = require("../usecase/employeeUsecase");

class EmployeeController {
  static async getAll(req, res) {
    try {
      const employees = await EmployeeUsecase.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const employee = await EmployeeUsecase.getEmployeeById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const filePath = req.file ? req.file.path : null;
      const data = {
        ...req.body,
        filePath,
      };
      const newEmployee = await EmployeeUsecase.createEmployee(data);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const filePath = req.file ? req.file.path : null;
      const data = {
        ...req.body,
        filePath,
      };
      const updatedEmployee = await EmployeeUsecase.updateEmployee(id, data);
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = EmployeeController;

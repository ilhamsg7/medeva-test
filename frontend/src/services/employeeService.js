import axiosInstance from "../api/axiosInstance";

export const getAllEmployees = async () => {
  const response = await axiosInstance.get("/employee");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await axiosInstance.get(`/employee/${id}`);
  return response.data;
};

export const createEmployee = async (formData) => {
  const response = await axiosInstance.post("/employee", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateEmployee = async (id, formData) => {
  const response = await axiosInstance.post(`/employee/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

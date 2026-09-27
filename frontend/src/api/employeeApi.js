import api from "./axios";

export const getEmployees = async () => {
    const response = await api.get("/employee");
    return response.data;
};

export const getEmployeeById = async (employeeId) => {
    const response = await api.get(`/employee/${employeeId}`);
    return response.data;
};

export const searchEmployees = async (search) => {
    const response = await api.get("/employee/search", {
        params: {
            search: search
        }
    });

    return response.data;
};

export const getEmployeesPagination = async (skip = 0, limit = 10) => {
    const response = await api.get("/employee/pagination", {
        params: {
            skip,
            limit
        }
    });

    return response.data;
};

export const sortEmployees = async (order = "asc") => {
    const response = await api.get("/employee/sort", {
        params: {
            order
        }
    });

    return response.data;
};

export const updateEmployee = async (employeeId, employeeData) => {
    const response = await api.put(
        `/employee/${employeeId}`,
        employeeData
    );

    return response.data;
};

export const deleteEmployee = async (employeeId) => {
    const response = await api.delete(`/employee/${employeeId}`);
    return response.data;
};

export const createEmployee = async (employeeData) => {
    const response = await api.post("/employee", employeeData);
    return response.data;
};

export const uploadEmployeeImage = async (employeeId, image) => {
    const formData = new FormData();

    formData.append("file", image);

    const response = await api.post(
        `/employee/${employeeId}/upload`,
        formData
    );

    return response.data;
};


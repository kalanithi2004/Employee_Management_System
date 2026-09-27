import api from "./axios";

export const getDepartments = async () => {
    const response = await api.get("/department");
    return response.data;
};

export const createDepartment = async (departmentData) => {
    const response = await api.post(
        "/department",
        departmentData
    );

    return response.data;
};

export const updateDepartment = async (
    departmentId,
    departmentData
) => {
    const response = await api.put(
        `/department/${departmentId}`,
        departmentData
    );

    return response.data;
};

export const deleteDepartment = async (departmentId) => {
    const response = await api.delete(
        `/department/${departmentId}`
    );

    return response.data;
};
import { axi } from './useAxios';

export const registerRequest = async (code, email, name, last_name, degree, password) => {
    await axi.post('/users/register/', {code, email, name, last_name, degree, password})
};

export const loginRequest = async (email, password) => {
    const response = await axi.post("/users/login/", {email, password})
    return response;
};
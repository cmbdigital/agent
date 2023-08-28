import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});

// AUTH
export const logout = () => api.post("/api/logout");
export const login = (data) => api.post("/api/login", data);
export const register = (data) => api.post("/api/register", data);
export const refresh = () => api.get("/api/refresh");
export const forgotPassword = (data) =>
    api.post("/api/request-password-reset", data);
export const resetPassword = (data) => api.post("/api/reset-password", data);
export const verifyMagicToken = (data) =>
    api.post("/api/validate-magictoken", data);
export const verifyEmail = (data) => api.post("/api/verify-email", data);
export const requestEmailVerification = () => api.get("/api/verify-email");


// AGENT
export const registerAgent = (data) => api.post("/api/agent/register", data);
export const getAgents = (type) => api.get(`/api/agent/all?type=${type}`);
export const getAgent = (id) => api.get(`/api/agent/${id}`);
export const loginAgent = (data) => api.post("/api/agent/login", data);
export const logoutAgent = () => api.post("/api/agent/logout");
export const refreshAgent = () => api.get("/api/agent/refresh");

// BRANCH
export const registerBranch = (data) => api.post("/api/branch/register", data);
export const getBranches = () => api.get("/api/branch/all");
export const getBranch = (id) => api.get(`/api/branch/${id}`);
export const getAllProductsOfBranch = (id) => api.get(`/api/branch/${id}/products`);

// PRODUCT
export const addCategory = (data) => api.post("/api/product/category/add", data);
export const getAllCategories = () => api.get("/api/product/category/all");
export const addProduct = (data) => api.post("/api/product/add", data);
export const getAllProducts = () => api.get("/api/product/all");
export const getProductById = (id) => api.get(`/api/product/${id}`);
export const getAllUnitsFromBranch = (id) => api.get(`/api/product/${id}/units`);
export const getFinancedProducts = () => api.get("/api/product/financed");

// CUSTOMER
export const registerCustomer = (data) => api.post("/api/customer/register", data);
export const getAllCustomers = () => api.get("/api/customer/all");
export const getCustomer = (id) => api.get(`/api/customer/agent/${id}`);
export const getAllAgentCustomers = () => api.get("/api/customer/agent");

// ORDERS
export const createOrder = (data) => api.post("/api/orders", data);
export const getAllOrders = () => api.get("/api/orders/agent");
export const getOrder = (id) => api.get(`/api/orders/agent/${id}`);
export const getAllAgentOrders = () => api.get("/api/orders/agent");
export const collectEMI = (id) => api.post(`/api/orders/emi/collect/${id}`);

// UPDATE
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
                    withCredentials: true,
                });
                return api.request(originalRequest);
            } catch (err) {
                console.log(err);
            }
        }
        throw error;
    }
);

export default api;
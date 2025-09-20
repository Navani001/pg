
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
console.log(process.env.NEXT_PUBLIC_BASE_URL )
// Create an Axios instance
const axiosClient = axios.create({
    baseURL:  "http://localhost:5000/",// Replace with your API URL
    headers: {
        // Authorization: `Bearer ${auth()?.token || ""}`, // Use auth token if available
    },
});

//  **Request Interceptor**


//  **Response Interceptor**
axiosClient.interceptors.response.use(
    <T>(response: AxiosResponse<T>): T => {
        console.log("Response Received:", response);
        return response.data; // Directly return the data instead of full response
    },
    (error) => {
        console.error("Response Error:", error.response);
        if (error.response?.status === 401) {
            console.log("Unauthorized! Redirecting to login...");
        }
        return Promise.reject(error);
    }
);

export async function getRequest<T>(URL: string, headers = {}) {
    const response = await axiosClient.get<T>(URL, {
        
        headers,
         
    });
    return response;
}

export async function postRequest<T>(
    URL: string,
    payload?: object,
    headers = {},
) {
    console.log("Making POST request to:", `http://localhost:5000/${URL}`);
    console.log("Payload:", payload);
    console.log("Headers:", headers);

    const response = await axiosClient.post<T>(URL, payload, {
        // withCredentials: true, // Temporarily disabled for CORS testing
        headers,
    });
    return response;
}

export async function putRequest<T>(
    URL: string,
    payload: object,
    headers = {},
) {
    const response = await axiosClient.put<T>(URL, payload, {
        headers,
    });
    return response;
}

export async function patchRequest<T>(
    URL: string,
    payload: object,
    headers = {},
) {
    const response = await axiosClient.patch<T>(URL, payload, {
        headers,
    });
    return response;
}

export async function deleteRequest<T>(
    URL: string,
    data: object,
    headers = {},
) {
    const response = await axiosClient.delete<T>(URL, {
        data,
        headers,
    });
    return response;
}

export function isRequestSuccessful(response: AxiosResponse | number): boolean {
    if (typeof response === 'number') {
        return response >= 200 && response < 300;
    }
    return response && response.status >= 200 && response.status < 300;
}

export function isRequestError(response: AxiosResponse | number): boolean {
    if (typeof response === 'number') {
        return response < 200 || response >= 300;
    }
    return response && (response.status < 200 || response.status >= 300);
}

export default axiosClient;
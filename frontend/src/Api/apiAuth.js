import axios from "axios";


export class AuthService {
    // constroctor

    async register(name, password) {
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name, password
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
    async login(name, password) {
        try {
            const res = await axios.post("/api/v1/auth/login", {
                name, password
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
    async logOut() {
        try {
            const res = await axios.post("/api/v1/auth/logout")
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
    async getCurrentUser() {
        try {
            const res = await axios.post("/api/v1/auth/get-current-user")
            if (!res) {
                return null;
            }
            return res;
        } catch (error) {
            // if (error) {
            //     throw error
            // }
            return false;
        }
    }
    async refreshAccessToken() {
        try {
            const res = await axios.post("/api/v1/auth/refresh-access-token")
            return res;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}


const apiAuth = new AuthService();
// authService.createAccount
export default apiAuth;
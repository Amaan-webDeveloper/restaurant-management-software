import axios from "axios";


export class ApiService {
    // constroctor

    async getFooditems(number) {
        try {
            if (number) {
                const res = await axios.post(`/api/v1/fooditem/get-fooditem?number=${number}`)
                return res;
            }
            const res = await axios.post(`/api/v1/fooditem/get-fooditem`)
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
    async newItem(foodItemImage, name, price, number) {
        try {
            const res = await axios.post(`/api/v1/fooditem/create-new-fooditem`, { foodItemImage, name, price, number }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    //     // "Connection":"keep-alive"
                }
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
}

const apiService = new ApiService();
// authService.createAccount
export default apiService;
import apiService from "../../../helpers/apiService";

export default {

    getUsername: async () => {
        const response = await apiService.get(`user`);
        return response.data;
    },

    getMobileNumber: async () => {
        const response = await apiService.get(`user`);
        return response.data;
    }

}
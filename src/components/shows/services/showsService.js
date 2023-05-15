import apiService from "../../../helpers/apiService";

export default {
    fetchAll: async (date) => {
        try {
            const response = await apiService.getWithouterrorHandling(`shows?date=${date}`);
            return response.data;
        } catch (error) {
            if(error.response.data){
                alert(error.response.data.details[0]);
                window.location.assign("/shows?date=" + error.response.data.details[0].substring(24));
            }
        }
    },

    getRevenue: async (date) => {
        const response = await apiService.get(`revenue?date=${date}`);
        return response.data;
    },

    create: async (payload) => {
        const response = await apiService.post("shows", payload);
        return response.data;
    }
}

import apiService from "../../../helpers/apiService";

export default {
    create: async (payload) => {
        try {
            const response = await apiService.post("bookings", payload);
            return response;
        } catch (error) {
            throw error;
        }


    }
}

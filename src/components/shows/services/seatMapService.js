import apiService from "../../../helpers/apiService";

export default {
    fetchMap: async (date,showId) => {
        const response = await apiService.get(`show/map?date=${date}&showId=${showId}`);
        return response.data;
    }
}
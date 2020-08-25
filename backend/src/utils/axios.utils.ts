import axios from 'axios';

export class AxiosUtils {
    public static async get(url: string): Promise<any> {
        return axios.get(url).then((response) => {
            return response.data;
        });
    }
}

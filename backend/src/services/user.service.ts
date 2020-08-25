import { Inject, Service } from 'typedi';
import { RedisService } from './redis.service';
import { SearchTypes } from './../enums';
import { GitHubUserType } from './../types';
import { AxiosUtils } from './../utils';
import { Config } from './../config';

@Service()
export class UserService {
    @Inject()
    private redisService: RedisService;

    /**
     * Fetches users list from redis, if data not present in redis then fetches from API
     * 
     * @returns users list
     */
    public async getUsers(searchText: string): Promise<GitHubUserType[]> {
        const result = await this.redisService.get(SearchTypes.users, searchText);
        if (result) {
            try {
                const existingUsers: GitHubUserType[] = JSON.parse(result);
                console.log(`Fetching users data from cache`);
                return existingUsers;
            } catch (err) {
                console.error(`Error in parsing the user details`);
            }
        }
        console.log(`Fetching users data from API`);
        const url: string = `${Config.API_END_POINTS.USERS}?q=${searchText}`;
        const data = await AxiosUtils.get(url);
        const users: GitHubUserType[] = [];
        data.items.forEach((item: GitHubUserType) => {
            // send only required data in response
            users.push({
                login: item.login,
                id: item.id,
                avatar_url: item.avatar_url,
                url: item.url,
                html_url: item.html_url,
                repos_url: item.repos_url,
            });
        });
        // stores stringified users list in the redis
        if(users.length){
            await this.redisService.set(SearchTypes.users, searchText, JSON.stringify(users));
        }
        return users;
    }
}

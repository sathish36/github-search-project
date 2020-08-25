import { Inject, Service } from 'typedi';

import { AxiosUtils } from './../utils';
import { Config } from './../config';
import { SearchTypes } from './../enums';
import { GitHubRepositoryType } from './../types';
import { RedisService } from './redis.service';

@Service()
export class RepositoryService {
    @Inject()
    private redisService: RedisService;

    /**
     *
     * Fetches the data from redis, if data is not present in redis then fetch from API
     * 
     * @returns repositories list
     */
    public async getRepositories(searchText: string): Promise<GitHubRepositoryType[]> {
        const result = await this.redisService.get(SearchTypes.repositories, searchText);
        if (result) {
            try {
                const existingRepositories: GitHubRepositoryType[] = JSON.parse(result);
                console.log('Fetching repositories data from cache');
                return existingRepositories;
            } catch (err) {
                console.error(`Error in parsing the repositories details`);
            }
        }
        console.log('Fetching repositories data from API');
        const url: string = `${Config.API_END_POINTS.REPOSITORIES}?q=${searchText}`;
        const data = await AxiosUtils.get(url);
        const repositories: GitHubRepositoryType[] = [];
        // send only required data in the response to minimize the response size
        data.items.forEach((item: GitHubRepositoryType) => {
            repositories.push({
                id: item.id,
                name: item.name,
                full_name: item.full_name,
                owner: {
                    login: item.owner.login,
                    id: item.owner.id,
                    avatar_url: item.owner.avatar_url,
                    url: item.owner.url,
                    html_url: item.owner.html_url,
                },
                html_url: item.html_url,
                description: item.description,
                url: item.url,
                git_url: item.git_url,
                clone_url: item.clone_url,
                stargazers_count: item.stargazers_count,
                watchers_count: item.watchers_count,
                open_issues_count: item.open_issues_count,
            });
        });

        // set stringified repositories list in in redis
        if(repositories.length){
            await this.redisService.set(SearchTypes.repositories, searchText, JSON.stringify(repositories));
        }
        return repositories;
    }
}

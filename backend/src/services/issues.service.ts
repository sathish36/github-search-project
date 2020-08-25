import { Inject } from 'typedi';

import { AxiosUtils } from './../utils';
import { Config } from './../config';
import { SearchTypes } from './../enums';
import { GitHubIssue } from './../types';
import { RedisService } from './redis.service';

export class IssuesService {
    @Inject()
    private redisService: RedisService;

    public async getIssues(searchText: string): Promise<GitHubIssue[]> {
        const result = await this.redisService.get(SearchTypes.issues, searchText);
        if (result) {
            try {
                const existingIssues: GitHubIssue[] = JSON.parse(result);
                console.log('Fetching issues data from cache');
                return existingIssues;
            } catch (err) {
                console.error(`Error in parsing the issues details`);
            }
        }
        console.log('Fetching issues data from API');

        const url: string = `${Config.API_END_POINTS.ISSUES}?q=${searchText}`;
        const data = await AxiosUtils.get(url);
        const issues: GitHubIssue[] = data.items;
        if(issues.length){
            await this.redisService.set(SearchTypes.issues, searchText, JSON.stringify(issues));
        }
        return issues;
    }
}

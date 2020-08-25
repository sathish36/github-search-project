import { JsonController, Res, Post, BodyParam } from 'routing-controllers';
import { Inject } from 'typedi';
import * as express from 'express';

import { IssuesService, RedisService, RepositoryService, UserService } from './../services/';
import { SearchTypes } from './../enums';
import { OpenAPI } from 'routing-controllers-openapi';

@JsonController('')
export class SearchController {
    @Inject()
    private redisService: RedisService;

    @Inject()
    private userService: UserService;

    @Inject()
    private repositoryService: RepositoryService;

    @Inject()
    private issuesService: IssuesService;

    /**
     *
     * @param res - response object
     * @param type - This is the type of search, it will be either users, repositories or issues
     * @param searchText - This is the parameter to search in git hub
     */
    @Post('/search')
    @OpenAPI({
        description:
            'List all available entities from github based on type provided. type will be either `users` or `repositories` or `issues`',
    })
    public async search(
        @Res() res: express.Response,
        @BodyParam('type') type: string,
        @BodyParam('searchText') searchText: string,
    ): Promise<{}> {
        if (!type) {
            return res.status(400).send({ message: 'Search type is required' });
        }
        if (!searchText || searchText.length < 3) {
            return res.status(400).send({ message: 'Search text should be minimum 3 characters' });
        }
        try {
            if (type === SearchTypes.users) {
                const users = await this.userService.getUsers(searchText);
                return res.status(200).send({ users });
            }
            if (type === SearchTypes.repositories) {
                const repositories = await this.repositoryService.getRepositories(searchText);
                return res.status(200).send({ repositories });
            }
            if (type === SearchTypes.issues) {
                const issues = await this.issuesService.getIssues(searchText);
                return res.status(200).send({ issues });
            }
            return res.status(400).send({ message: 'Invalid search type provided' });
        } catch (err) {
            console.error(`Error in search: `, err);
            return res.status(500).send({ message: 'Oops, something went wrong' });
        }
    }

    @OpenAPI({
        description: 'Clears users and repositories cache stored in the redis',
    })
    @Post('/clear-cache')
    public async clearCache(@Res() res: express.Response): Promise<{}> {
        try {
            await this.redisService.clearCache();
            return res.status(200).send({ message: 'success' });
        } catch (err) {
            console.error(`Error in clearing the redis cache: `, err);
            return res.send(500).send({ message: 'error' });
        }
    }
}

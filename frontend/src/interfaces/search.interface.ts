import { UserDetailsType } from "../types/user.types";
import { RepositoryType } from "../types/repository.types";

export interface ISearchProps {
    loading: boolean,
    status: boolean,
    error: string,
    users: {[key:string]: UserDetailsType[]},
    repositories: {[key:string]:RepositoryType[]},
    fetchUserAction:(searchText:string)=>void,
    fetchRepositoriesAction:(searchText:string)=>void;
}
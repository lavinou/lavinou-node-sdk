import { FilterQuery } from "./FilterQuery";
import { OrderQuery } from "./OrderQuery";
import { PaginationQuery } from "./PaginationQuery";

export interface ListParams {
    filter: FilterQuery
    sort: OrderQuery 
    pagination: PaginationQuery 
}
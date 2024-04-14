export default interface FilterQuery{
        search?: string,
        category?: string[],
        minPrice?: number,
        maxPrice?: number,
        sort?: string,
        tags?: string[]  
        modified?: boolean
}
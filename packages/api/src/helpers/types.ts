export interface Response {
    code: Number
    message: String
    data: Array<any> | Object | null
    error: Boolean
}

import type {IComment} from "@/models/IComment";

export interface IResponse {
    status: string,
    message: string,
    comment_count: number,
    comments: IComment[],
}

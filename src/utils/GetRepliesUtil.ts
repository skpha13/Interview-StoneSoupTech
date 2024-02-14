import type {IComment} from "@/models/IComment";

export function getReplies(id: number, matrix: any, comments: IComment[]) {
    let comments_result = [];

    if (matrix === undefined)
        return []

    if(matrix[id].length < 1)
        return []

    for (let iterator of matrix[id]) {
        for (let comment of comments) {
            if (iterator == comment.id)
                comments_result.push(comment);
        }
    }

    return comments_result;
}
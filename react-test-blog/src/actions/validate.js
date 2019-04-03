export const validateArticle = (head, brief, content) => {
    return !(
    head.length >= 5 && head.length <= 50 &&
    brief.length >= 10 && brief.length <= 200 &&
    content.length >= 150 && content.length <= 2000
    )
}

export const validateComment = (author, comment) => {
    return !(
        author.length >=2 && author.length <= 20 &&
        comment.length >=5 && author.length <= 150
    )
}

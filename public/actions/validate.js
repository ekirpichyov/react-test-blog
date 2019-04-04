import $ from "jquery"
import validate from 'jquery-validation'

export const validateArticle = (head, brief, content) => {
    $(".popup form").validate({
        rules: {
            head: {
                minlength: 5,
                maxlength: 50
            },
            brief: {
                minlength: 10,
                maxlength: 200
            },
            content: {
                minlength: 150,
                maxlength: 2000
            }
        },
        messages: {
            head: {
                minlength: "Не менее 5 символов",
                maxlength: "Не более 50 символов"
            },
            brief: {
                minlength: "Не менее 10 символов",
                maxlength: "Не более 200 символов"
            },
            content: {
                minlength: "Не менее 150 символов",
                maxlength: "Не более 200 символов"
            }
        }
    })

    return !(
        head.length >= 5 && head.length <= 50 &&
        brief.length >= 10 && brief.length <= 200 &&
        content.length >= 150 && content.length <= 2000
        )
}

export const validateComment = (author, comment) => {
    return !(
        author.length >=2 && author.length <= 30 &&
        comment.length >=5 && author.length <= 150
    )
}

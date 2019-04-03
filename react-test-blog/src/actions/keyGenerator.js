const min = 1
const max = 10000
const generator = (exclude) => {
    const random = Math.floor(Math.random() * (max - min) + min)
    return exclude.includes(random) ? generator(exclude) : random + []
}

export default generator
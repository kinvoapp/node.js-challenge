

export const calculate = (result: Array<any>) => {
    return result.reduce((value, acc) => {
        return value + acc.value
    }, 0)
}

import { ValidationError } from 'yup';

export function handleYupError(error: any) {
    const newError = new ValidationError(error)
    const errorList: Record<string, string> = {}
    newError.inner.forEach((errorField) => {
        errorList[errorField.path!] = errorField.message
    })
    if (errorList) {
        return errorList
    }
    return (newError.errors)
}

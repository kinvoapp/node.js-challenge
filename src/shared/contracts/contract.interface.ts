export interface IContract {
    errors?: Array<{ message: string }>,
    validate(model: any): boolean;
}
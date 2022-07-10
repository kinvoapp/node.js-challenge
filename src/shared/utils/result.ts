export class Result {
    constructor(
        public sucess: boolean,
        public data: any,
        public messege?: Array<{ message: string }>,
        public error?: number,
    ) { }
}
import { Response } from "express";

export const badRequest = (res: Response, err: string) => 
    res.status(400).json({
        err
    });

export const notFound = (res: Response) => res.sendStatus(404);

export const ok = (res: Response) => res.sendStatus(200);

export const internalServerError = (res: Response, err: Error) => 
    res.status(500).json({
        err: err.message
    })

export const validateNumber = (num: any) => parseFloat(num) > 0;

export function convertToLocalCurreny(value: number) {
    let localCurrency = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    return localCurrency;
}


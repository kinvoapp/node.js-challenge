// Interface para resposta de sucesso
interface ISuccess {
  success: boolean;
  data: any;
}

// Interface para resposta de erro
interface IError {
  message: string;
  error: any;
}

export { IError, ISuccess };

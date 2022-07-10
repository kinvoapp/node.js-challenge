export interface IUserCredentialsWithAccountId {
  id: string;
  document: string;
  password: string;
  accountId: string;
}

export interface IFindStudentByDocumentRepository {
  findByDocument(
    document: string
  ): Promise<IUserCredentialsWithAccountId | null>;
}

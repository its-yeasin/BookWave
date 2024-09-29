export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGenericResponse = {
  statusCode: number;
  message: string;
  errorMessages: TErrorSource;
};

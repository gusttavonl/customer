export type HttpResponse = {
  statusCode: number;
  body: any;
};

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
});

export const badRequest = (errorMessage: string): HttpResponse => ({
  statusCode: 400,
  body: errorMessage
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: "Unauthorized"
});

export const notFound = (errorMessage: string): HttpResponse => ({
  statusCode: 404,
  body: errorMessage
});

export const notAvailable = (errorMessage?: string): HttpResponse => ({
  statusCode: 502,
  body: errorMessage
});

export const conflict = (errorMessage?: string): HttpResponse => ({
  statusCode: 409,
  body: errorMessage
});

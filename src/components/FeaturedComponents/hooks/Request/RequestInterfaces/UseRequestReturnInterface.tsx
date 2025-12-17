export interface UseRequestReturnInterface<ResponseType, RequestBodyType> {
  loading: boolean;
  sendRequest: (
    body?: RequestBodyType,
    customUrl?: string
  ) => Promise<ResponseType>;
}
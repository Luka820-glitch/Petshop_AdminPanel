import { useState } from "react";
import type { UseRequestParamsInterface } from "./RequestInterfaces/UseRequestParamsInterface";
import type { UseRequestReturnInterface } from "./RequestInterfaces/UseRequestReturnInterface";


function useRequest<ResponseType, RequestBodyType = undefined>(
  { url, method }: UseRequestParamsInterface
): UseRequestReturnInterface<ResponseType, RequestBodyType> {
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (
    body?: RequestBodyType,
    customUrl?: string
  ): Promise<ResponseType> => {
    setLoading(true);
    try {
      const response = await fetch(url || customUrl!, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-bypass-token": import.meta.env.VITE_APP_API_KEY,
        },
        body: body && method !== "GET" ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: ResponseType = await response.json();
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendRequest };
}

export default useRequest;

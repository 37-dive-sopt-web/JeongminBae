import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://15.164.129.239",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
};


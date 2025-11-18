import { api, type ApiResponse } from "./client.ts";

export type Member = {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
};

export type SignUpPayload = {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
};

export type LoginPayload = { username: string; password: string };
export type LoginResult = { userId: number; message: string };

function unwrap<T>(res: ApiResponse<T>, defaultMessage: string): T {
  if (!res.success || !res.data) {
    throw new Error(res.message || defaultMessage);
  }
  return res.data;
}

export async function signUp(payload: SignUpPayload): Promise<Member> {
  const res = await api.post("api/v1/users", { json: payload }).json<ApiResponse<Member>>();
  return unwrap(res, "회원가입에 실패했습니다.");
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  const res = await api.post("api/v1/auth/login", { json: payload }).json<ApiResponse<LoginResult>>();
  return unwrap(res, "로그인에 실패했습니다.");
}

export async function getUser(id: number): Promise<Member> {
  const res = await api.get(`api/v1/users/${id}`).json<ApiResponse<Member>>();
  return unwrap(res, "회원 정보를 불러오지 못했습니다.");
}

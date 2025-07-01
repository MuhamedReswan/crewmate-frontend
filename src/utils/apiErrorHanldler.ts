import axios from "axios";
import { ErrorResponseData } from "@/types/error.type";

export const getApiErrorMessage = (error: unknown, fallback = "Something went wrong"): string => {
  if (axios.isAxiosError<ErrorResponseData>(error)) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
};
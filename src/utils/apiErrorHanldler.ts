import { ErrorResponseData } from "@/types/error.type";
import axios from "axios";

export const getApiErrorMessage = (error: unknown, fallback = "Something went wrong"): string => {
  if (axios.isAxiosError<ErrorResponseData>(error)) {
    console.log("its a axios error from api error handler");
  }

  if (axios.isAxiosError<ErrorResponseData>(error)) {
    return error.response?.data?.message || fallback;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    console.log("its a error object from api error handler");
    return (error as ErrorResponseData).message;
  }
  return fallback;
};

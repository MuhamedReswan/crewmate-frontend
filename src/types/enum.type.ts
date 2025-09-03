/* eslint-disable no-unused-vars */
export enum Role {
  VENDOR = "vendor",
  SERVICE_BOY = "serviceBoy",
  ADMIN = "admin",
}

export enum Messages {
  INVALID_OTP = "Invalid OTP",
  OTP_VERIFIED = "OTP Verified Successfully!",
  ENTER_VALID_OTP = "Please Enter a valid 4-digit OTP",
  BLOCKED_BY_ADMIN = "You were blocked by admin.",
  FAILED_TO_UPDATE_PROFILE = "Failed to update profile",
  FETCH_PROFILE_FAILED = "Something went wrong. Please login again.",
  UPDATE_PROFILE_FAILED = "Failed to update profile. Please try again.",
  LOGOUT_FAILED = "some thing went wrong on logout. please try again",
  RESEND_OTP_FAILED = "Failed to resend OTP",
  FAILED_TO_FETCH_VERIFICATION_SERVICE_BOY ="Failed to fetch service boy verification",
  VERIFCATION_STATUS_CHANGE_FAILED = "Failed verification status change",
  FAILED_TO_FETCH_IMAGES = "Failed to fetch images"
}


export enum VerificationStatus {
  Pending = "pending",
  Verified = "verified",
  Rejected = "rejected",
}


export enum Role{
    VENDOR = "vendor",
    SERVICE_BOY = "serviceBoy",
    ADMIN = "admin"
}

export enum Messages{
    INVALID_OTP = "Invalid OTP",
    OTP_VERIFIED = "OTP Verified Successfully!",
    ENTER_VALID_OTP = "Please Enter a valid 4-digit OTP",
    BLOCKED_BY_ADMIN = "You were blocked by admin.",
    FAILED_TO_UPDATE_PROFILE = "Failed to update profile",
    FETCH_PROFILE_FAILED = "Something went wrong. Please login again.",
    UPDATE_PROFILE_FAILED = "Failed to update profile. Please try again.",
    LOGOUT_FAILED = "some thing went wrong on logout. please try again",
    RESEND_OTP_FAILED  = "Failed to resend OTP",
}
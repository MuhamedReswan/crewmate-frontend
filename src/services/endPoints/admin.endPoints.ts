export const adminAuthRoutes = {
    login: "/auth/admin/login",
    logout: "/auth/admin/logout",
}

export const adminRoutes = {
    serviceBoyVerificationRequest : "admin/service-boys/verify",
    verifyServiceBoyById : "admin/service-boys/:id/verify",
    updateStatusServiceBoyById : "admin/service-boys/:id/:status",
    getServiceBoyById : "admin/service-boys/:id",
    LoadServiceBoys : "admin/service-boys",
    
    
    vendorVerificationRequest : "admin/vendors/verify",
    verifyVendorById : "admin/vendors/:id/verify",
    LoadVendors : "admin/vendors",
    getVendorById : "admin/vendors/:id"
}


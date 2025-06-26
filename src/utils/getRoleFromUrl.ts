export const getRoleFromUrl = (url?: string) => {
    if (!url) return null;
  
    if (url.includes('/admin')) return 'admin';
    if (url.includes('/vendor')) return 'vendor';
    if (url.includes('/service-boy')) return 'service-boy';
  
    return null;
  };
  
  
// Configuration file - DO NOT commit this file to version control
// Add this file to .gitignore

const CONFIG = {
  // TEMPORARY: Using original key until new one is obtained
  // TODO: Replace with new API key from Ez Scheduler and revoke the old one
  EZ_SCHEDULER_API_KEY: "ZDQ1OTExZjctNDhhNy00NzllLWE0NDEtMWI5ODNiNjhmN2Nl",
  
  // Other configuration options
  SCHEDULER_CONFIG: {
    primaryColor: "#6B8A9A",
    gradientColor: "linear-gradient(135deg, #6B8A9A 0%, #4A6B7C 100%)",
    hideFloatingButton: true,
    position: "right"
  }
};

// Export for use in other files
window.APP_CONFIG = CONFIG;
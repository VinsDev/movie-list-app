export const handleApiError = (error: any): string => {
    if (error.response) {
      return error.response.data.message;
    } else if (error.request) {
      return 'Network error. Please try again later.';
    } else {
      return 'An unknown error occurred.';
    }
  };
  
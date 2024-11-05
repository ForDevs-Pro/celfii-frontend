export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${JSON.parse(token)}`,
  };
};

export const getAuthHeadersForUsers = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${JSON.parse(token)}`,
    "Content-Type": "application/json",
  };
};

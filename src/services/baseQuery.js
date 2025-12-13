import httpRequest from "../utils/httpRequest";

const baseQuery =
  () =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await httpRequest({
        url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default baseQuery;

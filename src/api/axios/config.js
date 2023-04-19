export const oBaseUrl = {
  fidoAppBaseUrl: {
    DEV: '/api/overviewGateway/service',
    PROD: import.meta.env.VITE_APP_AXIOS_BASEURL + '/overviewGateway/service',
  },
};

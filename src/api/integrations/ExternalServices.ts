import { request } from '../Request';

const ExternalServiceKeys = {
  getSlackIntegration: () => ['slackIntegration'],
  getZoomIntegration: () => ['zoomIntegration'],
};

const externalServicesAPI = {
  getSlackIntegration: async (params: GetSlackIntegrationParams) => {
    return await request.get<GetSlackIntegrationResponse>(
      `/slack/initIntegration?code=${params.code}`
    );
  },
  disconnectSlack: async () => {
    return await request.get(`/slack/disconnect`);
  },
  getZoomIntegration: async (params: GetZoomIntegrationParams) => {
    return await request.get<GetZoomIntegrationResponse>(
      `/zoom/initIntegration?code=${params.code}`
    );
  },
};

export { ExternalServiceKeys, externalServicesAPI };

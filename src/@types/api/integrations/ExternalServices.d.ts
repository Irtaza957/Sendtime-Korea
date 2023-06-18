// slack
type GetSlackIntegrationParams = {
  code: string;
};

type GetSlackIntegrationResponse = {
  status: {
    code: number;
    message: string;
  };
};

type DisconnectSlackResponse = {
  status: {
    code: number;
    message: string;
  };
};

// zoom
type GetZoomIntegrationParams = {
  code: string;
};

type GetZoomIntegrationResponse = {
  status: {
    code: number;
    message: string;
  };
};

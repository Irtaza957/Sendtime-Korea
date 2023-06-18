import { request } from '../Request';

const SurveyAPI = {
  create: async (params: SurveyParams) => {
    const { data } = await request.post<ResponseStatus>(`/surveys`, params);

    return data;
  },
};

export { SurveyAPI };

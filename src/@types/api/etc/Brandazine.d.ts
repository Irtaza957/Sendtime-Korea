type GetBrandazineFormDataResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      id: string;
      title: string;
      description: string;
      categories: BrandazineCategory[];
    }
  ];
};

type BrandazineCategory = {
  categoryName: string;
  categoryDescription: string;
  optionType: string;
  options: string[];
};

type SubmitBrandazineFormDataRequestParams = {
  reservationAttendee: {
    name: string;
    organization: string;
    role: string;
    department: string;
    phone: string;
    email: string;
  };
  categories: {
    categoryName: string;
    selectedOption: string;
  }[];
};

type BrandazineMappingResultType = 'REDIRECT_URL' | 'TEXT';

type SubmitBrandazineFormDataResponse = {
  status: {
    code: number;
    message: string;
  };
  results: [
    {
      mappingResultType: BrandazineMappingResultType;
      mappingResultBody: string;
      reservationAttendee: {
        name: string;
        organization: string;
        role: string;
        department: string;
        phone: string;
        email: string;
      };
    }
  ];
};

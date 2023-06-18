type FileDetails = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

type IForm = {
  questions: IFormQuestion[];
};

type IFormQuestion = {
  id?: string;
  nanoId: string;
  questionType:
    | 'SHORT_LINE'
    | 'MULTIPLE_LINES'
    | 'NAME'
    | 'EMAIL'
    | 'PHONE'
    | 'RADIO'
    | 'CHECK_BOX'
    | 'DROP_DOWN'
    | 'FILE';
  title: string;
  value?: string;
  othersInputValue?: string;
  selectedOptions?: string[];
  options?: string[];
  isContainEtc: boolean;
  isRequired: boolean;
  isSwitchOn: boolean;
  isSwitchToggleAllowed: boolean;
  helpText?: string;
  accessWithPassword?: string;
};

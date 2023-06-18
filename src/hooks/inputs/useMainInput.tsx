import React, { ChangeEvent, useState } from 'react';

import TextArea from '@components/TextArea';
import TextInput from '@components/TextInput';

type DescriptionViewType = {
  label?: string;
  placeholder?: string;
};

type useMainInputParams = {
  defaultTitle?: string;
  defaultDescription?: string;
};

const useMainInput = ({
  defaultTitle,
  defaultDescription,
}: useMainInputParams) => {
  const [title, setTitle] = useState({
    value: defaultTitle ?? '',
    validated: true,
  });
  const [description, setDescription] = useState(defaultDescription || '');

  const handleTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 100) return;

    setTitle({
      value: target.value,
      validated: !!target.value,
    });
  };

  const handleDescription = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
  };

  const TitleView = ({ autoFocus = true }: { autoFocus?: boolean }) => {
    return (
      <TextInput
        value={title.value}
        onChange={handleTitle}
        validated={title.validated}
        autoFocus={autoFocus}
        required
      />
    );
  };

  const DescriptionView = ({ label, placeholder }: DescriptionViewType) => {
    return (
      <TextArea
        label={label}
        value={description}
        onChange={handleDescription}
        placeholder={placeholder}
      />
    );
  };

  return { title, description, TitleView, DescriptionView };
};

export default useMainInput;

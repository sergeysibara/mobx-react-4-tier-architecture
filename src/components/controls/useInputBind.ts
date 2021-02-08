import { default as React, Dispatch, SetStateAction, useState } from 'react';

const useInputBind = (
  initialValue = '',
): [
  string,
  Dispatch<SetStateAction<string>>, // setState type
  {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  },
] => {
  const [value, setValue] = useState<string>(initialValue);

  return [
    value,
    setValue,
    {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  ];
};

export default useInputBind;

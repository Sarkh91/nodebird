import { useCallback, useState } from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, [value]);

  return [value, onChange];
};

export default useInput;

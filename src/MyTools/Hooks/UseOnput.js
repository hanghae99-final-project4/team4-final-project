import React, { useCallback, useState } from "react";

const useOnput = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const handler = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  //useInput(초기값=initialForm)일 때 reset은 SetForm을 불러오는  콜백함수
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, handler, reset];
};

export default useOnput;

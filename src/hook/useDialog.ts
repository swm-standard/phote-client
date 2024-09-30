import { useState } from 'react';

const useDialog = (init = false) => {
  const [isOpen, setIsOpen] = useState(init);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggleOpen };
};

export default useDialog;

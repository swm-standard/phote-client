import { useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggleOpen };
};

export default useDialog;

'use client';

import React, { useState } from 'react';
import DeleteAlertDialog from '@/app/(top)/workbookDetail/[workbookId]/delete-alert-dialog';

const WorkbookEditButtons = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((prev) => !prev);
  };

  return (
    <div>
      <button>문제집 편집</button>
      <button onClick={toggleDeleteDialog}>문제집 삭제</button>
      <button>문제집 공유</button>
      <DeleteAlertDialog
        isOpen={isDeleteDialogOpen}
        toggleDeleteDialog={toggleDeleteDialog}
      />
    </div>
  );
};

export default WorkbookEditButtons;

'use client';

export type Workbook = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  quantity: number;
  modifiedAt: Date;
};

const WorkbookCard = ({ workbook }: { workbook: Workbook }) => {
  return (
    <div className="w-4/5 p-1 border-black border-[1px]">
      <div>{workbook.emoji}</div>
      <div>{workbook.title}</div>
      <div>{workbook.description}</div>
      <div>{workbook.quantity}</div>
      <div suppressHydrationWarning>{workbook.modifiedAt.toString()}</div>
    </div>
  );
};

const WorkbookCards = ({ workbooks }: { workbooks: Workbook[] }) => {
  return (
    <div>
      {workbooks.map((workbook) => (
        <WorkbookCard workbook={workbook} key={workbook.id} />
      ))}
    </div>
  );
};

export default WorkbookCards;

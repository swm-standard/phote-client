import { IQuestion } from '@/model/i-question';

let session: any;
if (typeof window !== 'undefined') {
  session = localStorage.getItem('accessToken');
}

export async function updateQuestionSequence({
  workbookId,
  questions,
}: {
  workbookId: string;
  questions: IQuestion[];
}) {
  const request = questions.map((ques, idx) => {
    return {
      id: ques.questionId,
      sequence: idx + 1,
    };
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/question-sequence/${workbookId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(request),
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`updateQuestionSequence failed by ${e}`);
  }
}

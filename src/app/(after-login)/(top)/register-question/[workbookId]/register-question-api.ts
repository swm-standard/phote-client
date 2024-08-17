export const searchQuestionsToRegister = async (
  workbookId: string,
  params: string,
) => {
  try {
    const response = await fetch(
      `/api/questions/workbook/${workbookId}?${params}`,
      {
        method: 'GET',
      },
    );
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`searchQuestionsToRegister failed by ${e}`);
  }
};

export async function registerQuestion({
  workbookId,
  checkedQuestions,
}: {
  workbookId: string;
  checkedQuestions: string[];
}) {
  try {
    const response = await fetch(`/api/workbook/${workbookId}`, {
      method: 'POST',
      body: JSON.stringify({ questions: checkedQuestions }),
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`registerQuestion failed by ${e}`);
  }
}

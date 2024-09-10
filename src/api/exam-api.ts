export async function readExamHistories(workbookId: string) {
  try {
    const response = await fetch(`/api/exams/${workbookId}`, {
      method: 'GET',
    });

    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`readExamHistories failed by ${e}`);
  }
}

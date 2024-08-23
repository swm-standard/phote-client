export async function readExamDetail(examId: string) {
  try {
    const response = await fetch(`/api/exam/${examId}`, {
      method: 'GET',
    });

    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`[createQuestion] failed by ${e}`);
  }
}

export async function readQuestionDetailById(questionId: string) {
  try {
    const response = await fetch(`/api/question/${questionId}`, {
      method: 'GET',
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`readQuestionDetailById failed by ${e}`);
  }
}

export async function deleteQuestionById(questionId: string) {
  try {
    const response = await fetch(`/api/question/${questionId}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`deleteQuestionById failed by ${e}`);
  }
}

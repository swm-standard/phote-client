export const searchQuestions = async (params: string) => {
  try {
    const response = await fetch(`/api/questions?${params}`, { method: 'GET' });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`searchQuestions failed by ${e}`);
  }
};

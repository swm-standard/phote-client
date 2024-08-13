import { ICreateQuestion } from '@/model/i-question';

export async function transformToQuestion(image: File) {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch(`/api/question-transform`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();
    const { content, options, transformedImageUrl } = json.data;
    const question: ICreateQuestion = {
      statement: content,
      image: transformedImageUrl || '',
      options: options,
      category: options ? 'MULTIPLE' : 'ESSAY',
      memo: '',
      tags: [],
      answer: '',
    };
    console.log(question);
  } catch (e) {
    console.error(`[transformToQuestion] failed by ${e}`);
  }
}

export async function createQuestion(createQuestion: ICreateQuestion) {
  const parsedOptions: { [key: number]: string } =
    createQuestion.options.reduce(
      (acc, option, index) => {
        acc[index + 1] = option.value;
        return acc;
      },
      {} as { [key: number]: string },
    );

  try {
    const response = await fetch('api/question', {
      method: 'POST',
      body: JSON.stringify({ ...createQuestion, options: parsedOptions }),
    });

    return response.ok;
  } catch (e) {
    console.error(`[createQuestion] failed by ${e}`);
  }
}

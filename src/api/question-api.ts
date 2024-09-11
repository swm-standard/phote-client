import { ICreateQuestion, ITmpQuestion } from '@/model/i-question';

export const searchQuestions = async (params: string) => {
  try {
    const response = await fetch(`/api/questions?${params}`, { method: 'GET' });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`searchQuestions failed by ${e}`);
  }
};

export async function deleteQuestion(questionId: string) {
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

export async function readQuestionDetail(questionId: string) {
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

export async function transformImageToQuestion({
  image,
  crop,
}: {
  image: File;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
}) {
  const formData = new FormData();
  formData.append('image', image);

  if (crop) {
    const { x, y, width, height } = crop!;
    const xLeft = Math.min(x, x + width);
    const xRight = Math.max(x, x + width);
    const yTop = Math.min(y, y + height);
    const yBottom = Math.max(y, y + height);
    const imageCoordinates = [
      [xLeft, yTop],
      [xRight, yTop],
      [xRight, yBottom],
      [xLeft, yBottom],
    ];
    const blobImageCoordinates = new Blob([JSON.stringify(imageCoordinates)], {
      type: 'application/json',
    });

    formData.append('imageCoordinates', blobImageCoordinates);
  }

  try {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/api/question-transform`,
      {
        method: 'POST',
        headers: {
          accessToken: localStorage.getItem('accessToken')!,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      console.error(`${response.status}`, `${response.statusText}`);
      const json = await response.json();
      console.log(json);
    } else {
      const json = await response.json();
      const { statement, options, image } = json.data;
      const question: ITmpQuestion = {
        statement,
        image: image || '',
        options,
        category: options.length ? 'MULTIPLE' : 'ESSAY',
        memo: '',
        tags: [],
        answer: '',
      };
      return question;
    }
  } catch (e) {
    console.error(`[transformToQuestion] failed by ${e}`);
  }
}

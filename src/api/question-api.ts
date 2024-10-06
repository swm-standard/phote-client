import { ICreateQuestion, ITmpQuestion } from '@/model/i-question';

export const searchQuestions = async (params: string) => {
  const response = await fetch(`/api/questions?${params}`, { method: 'GET' });
  const jsonResponse = await response.json();
  return jsonResponse.data;
};

export async function deleteQuestion(questionId: string) {
  const response = await fetch(`/api/question/${questionId}`, {
    method: 'DELETE',
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function readQuestionDetail(questionId: string) {
  const response = await fetch(`/api/question/${questionId}`, {
    method: 'GET',
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
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

  const response = await fetch('api/question', {
    method: 'POST',
    body: JSON.stringify({ ...createQuestion, options: parsedOptions }),
  });

  const jsonResponse = await response.json();
  return jsonResponse.data;
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

  let response = await fetch(
    `${process.env['NEXT_PUBLIC_BASE_URL']}/api/question-transform`,
    {
      method: 'POST',
      headers: {
        accessToken: localStorage.getItem('accessToken')!,
      },
      body: formData,
    },
  );

  if (response.status === 403) {
    const refreshResponse = await fetch(
      `${process.env['NEXT_PUBLIC_BASE_URL']}/api/auth/refreshtoken`,
      {
        method: 'POST',
        headers: {
          refreshToken: localStorage.getItem('refreshToken')!,
        },
      },
    );

    if (!refreshResponse.ok) {
      const json = await refreshResponse.json();
      const error = new Error();
      error.message = json.data['서버 내 오류'];
      throw error;
    }

    const json = await refreshResponse.json();
    localStorage.setItem('accessToken', json.data.accessToken);

    response = await fetch(
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
      const json = await response.json();
      const error = new Error();
      error.message = json.data['서버 내 오류'];
      throw error;
    }
  } else if (!response.ok) {
    const json = await response.json();
    const error = new Error();
    error.message = json.data['서버 내 오류'];
    throw error;
  }

  const json = await response.json();
  const { statement, options, image: img } = json.data;
  const question: ITmpQuestion = {
    statement,
    image: img || '',
    options,
    category: options.length ? 'MULTIPLE' : 'ESSAY',
    memo: '',
    tags: [],
    answer: '',
  };
  return question;
}

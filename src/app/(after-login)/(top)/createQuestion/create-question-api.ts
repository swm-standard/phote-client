import { ICreateQuestion, ITmpQuestion } from '@/model/i-question';

export async function transformToQuestion(image: File) {
  const formData = new FormData();
  formData.append('image', image);

  const imageCoordinates = [
    [160, 282],
    [462, 278],
    [460, 518],
    [151, 513],
  ];
  const blobImageCoordinates = new Blob([JSON.stringify(imageCoordinates)], {
    type: 'application/json',
  });

  formData.append('imageCoordinates', blobImageCoordinates);

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

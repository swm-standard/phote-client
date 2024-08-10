'use server';

import authFetch from '@/util/auth-fetch';

export const searchQuestions = async (params: string) => {
  try {
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/questions?${params}`,
      { method: 'GET' },
    );

    return jsonRaw.data;
  } catch (e) {
    console.error(`searchQuestions failed by ${e}`);
  }
};

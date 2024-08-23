import { NextRequest, NextResponse } from 'next/server';
import { setAccessToken, setRefreshToken } from '@/util/cookies';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(generateUrl(request), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const json = await response.json();
      const { accessToken, refreshToken } = json.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      return NextResponse.json(json);
    } else {
      const error = await response.json();
      return NextResponse.json(
        {
          message: error.message || '????' + 'error in route handler',
        },
        { status: response.status },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 },
    );
  }
}

function generateUrl(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const path = request.nextUrl.pathname;
  const queryParams = request.nextUrl.searchParams.toString();

  return queryParams ? `${baseUrl}${path}?${queryParams}` : `${baseUrl}${path}`;
}

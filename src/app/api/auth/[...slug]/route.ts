import { NextRequest, NextResponse } from 'next/server';
import { clearTokens, setAccessToken, setRefreshToken } from '@/lib/cookies';

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
      const errorJson = await response.json();
      return NextResponse.json(errorJson);
    }
  } catch (e) {
    console.error('[AuthRouteHandler]', e);
    return NextResponse.json(
      { message: '[AuthRouteHandler] Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  clearTokens();
  return NextResponse.json({ message: 'success', status: 200 });
}

function generateUrl(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const path = request.nextUrl.pathname;
  const queryParams = request.nextUrl.searchParams.toString();

  return queryParams ? `${baseUrl}${path}?${queryParams}` : `${baseUrl}${path}`;
}

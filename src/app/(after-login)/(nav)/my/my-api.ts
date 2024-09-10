import { throwCustomError } from '@/lib/error';

export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const jsonResponse = await response.json();

  if (response.ok) {
    return jsonResponse.data;
  } else {
    throwCustomError('logout', jsonResponse);
  }
};

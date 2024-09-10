import { throwCustomError } from '@/lib/error';

export async function getSharedWorkbook({
  workbookId,
}: {
  workbookId: string;
}) {
  const response = await fetch(`/api/shared-workbook`, {
    method: 'POST',
    body: JSON.stringify({ workbookId }),
  });
  const jsonResponse = await response.json();

  if (!response.ok) {
    throwCustomError('getSharedWorkbook', jsonResponse);
  }
  return jsonResponse.data;
}

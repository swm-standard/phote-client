export function throwCustomError(
  fnName: string,
  wrongResponseData: { status: string; message: string },
) {
  throw new Error(
    `[${fnName} ${wrongResponseData.status} ${wrongResponseData.message}]`,
  );
}

// export function printCustomError(fnName: string, error: any) {
//   console.error();
// }

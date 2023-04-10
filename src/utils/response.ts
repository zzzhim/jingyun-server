export function createResponse(
  data: any,
  success = true,
  code = 200,
  message = ''
) {
  return {
    success,
    code,
    message,
    data,
  };
}

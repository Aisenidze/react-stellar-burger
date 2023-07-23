export function _checkResponse(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Ошибка" + response.status);
  }
}
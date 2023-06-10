export function _checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Ошибка" + response.status);
  }
}
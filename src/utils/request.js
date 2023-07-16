import { baseUrl } from "./api";
import { _checkResponse } from "./checkresponse";
import { getCookie } from "./cookie";

export const request = async (url, options) => {
  const res = await fetch(url, options)
  return _checkResponse(res)
}

export const refreshToken = () => {
  const url = `${baseUrl}/auth/token`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refresh')
    })
  };
  request(url, options)
    .then(data =>  console.log(data))
    .catch(console.warn)
}
const getTokenFromLS = async () => {
  return await localStorage.getItem("token");
};

/**
 * ls에서 토큰을 가져와 axios 요청에 들어갈 config 객체의 header에 Authorization을 추가합니다.
 * @param {object} config axios 요청에 인자로 전달될 config 객체
 * @returns {object} Authorization에 token이 추가된 config 객체
 */
export const appendAuth = (config) => {
  const accessToken = getTokenFromLS();
  if (accessToken) {
    if (!config) config = { headers: {} };
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

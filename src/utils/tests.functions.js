exports.createUser = async (frisby, URL_Deploy, object) =>
  await frisby.post(`${URL_Deploy}/user`, object).expect("status", 201);

exports.loggingIn = async (frisby, URL_Deploy, object, status) =>
  await frisby
    .post(`${URL_Deploy}/login`, object)
    .expect("status", status)
    .then((response) => {
      const { body } = response;

      return JSON.parse(body);
    });

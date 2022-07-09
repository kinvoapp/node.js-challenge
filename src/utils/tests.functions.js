exports.createUser = async (frisby, URL_Deploy, object) =>
  await frisby.post(`${URL_Deploy}/user`, object).expect("status", 201);

exports.loggingIn = async (frisby, URL_Deploy, object) =>
  await frisby.post(`${URL_Deploy}/login`, object).expect("status", 200);

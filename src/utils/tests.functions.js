exports.createUser = async (frisby, URL_Deploy, object, status) =>
  await frisby
    .post(`${URL_Deploy}/user`, object)
    .expect("status", status)
    .then((response) => {
      const { body } = response;

      return JSON.parse(body);
    });

exports.loggingIn = async (frisby, URL_Deploy, object, status) =>
  await frisby
    .post(`${URL_Deploy}/login`, object)
    .expect("status", status)
    .then((response) => {
      const { body } = response;

      return JSON.parse(body);
    });

exports.deleteUser = async (frisby, URL_Deploy, id, status) =>
  await frisby
    .delete(`${URL_Deploy}/user/${id}`)
    .expect("status", status)
    .then((response) => {
      const { body } = response;

      return JSON.parse(body);
    });

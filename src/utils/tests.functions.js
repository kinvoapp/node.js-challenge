exports.createTestFunction = async (
  frisby,
  URL_Deploy,
  route,
  object,
  status
) =>
  await frisby
    .post(`${URL_Deploy}/${route}`, object)
    .expect("status", status)
    .then((response) => {
      const { body } = response;

      return JSON.parse(body);
    });

exports.getTestFunction = async (frisby, URL_Deploy, route, id, status) =>
  await frisby
    .delete(`${URL_Deploy}/${route}/${id}`)
    .expect("status", status)
    .then((response) => {
      const { body } = response;

      return JSON.parse(body);
    });

exports.deleteTestFunction = async (frisby, URL_Deploy, route, id, status) =>
  await frisby
    .delete(`${URL_Deploy}/${route}/${id}`)
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

export const environment = {
  registerUrl: 'http://localhost:8080/api/auth/register',
  loginUrl: 'http://localhost:8080/api/auth/login',
  userUrl: 'http://localhost:8080/api/auth/me',

  editUrl: 'http://localhost:8080/api/auth/users/{id}',
  deleteUrl: 'http://localhost:8080/api/auth/users/{id}',

  getEventsUrl: 'http://localhost:8080/api/events',
  postEventUrl: 'http://localhost:8080/api/events',
  updateEventurl: 'http://localhost:8080/api/events/{id}',
  deleteEventUrl: 'http://localhost:8080/api/events/{id}',
  saveEventUrl: 'http://localhost:8080/api/events/{id}/save',
};

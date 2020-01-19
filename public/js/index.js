function deleteUser(userId) {
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/registrations/' + userId;
  Http.open("DELETE", url);
  Http.send();
}

// function editUser(userId) {
//   const Http = new XMLHttpRequest();
//   const url='http://localhost:3000/users/' + userId;
//   Http.open("PUT", url);
//   Http.send()
// }
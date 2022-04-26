const users = [];

function joinUser(user_id, username, room_id) {
  const user = { 'user_id': user_id, 'username':username, 'room_id':room_id };

  users.push(user);
  //console.log(users, "users");

  return user;
}

function getUserById(user_id) {
  return users.find((user) => user.user_id === user_id);
}
function getUsers() {
  return users;
}

function logoutUser(user_id) {
  const index = users.findIndex((user) => user.user_id === user_id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  getUsers,
  joinUser,
  getUserById,
  logoutUser,
};

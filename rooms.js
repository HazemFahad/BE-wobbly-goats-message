const rooms = [
  {
    room_id: 1,
    name: "Room 1",
  },
  {
    room_id: 2,
    name: "Room 2",
  },
];

function getRoomById(room_id) {
  return rooms.find((room) => room.room_id === room_id);
}
function getRooms() {
  return rooms;
}

module.exports = { getRooms, getRoomById };

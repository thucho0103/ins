module.exports = (socket) => {

    const joinRoom = (data) => {
      console.log("join_room "+data);
      console.log( socket.id +" join room " + data.room);
      socket.join(data.room);
    } 
  
    const leaveRoom = (data) => {
      socket.leave(data.room);
    } 
  
    const chatText = (data) => {
      console.log("chat_text "+data);
      console.log( socket.id +"emit chat_text " + data.message);
      socket.to(data.room).emit("chat_text",data);
      //io.to(data.room).emit(data.messages);
    } 
    const chatImage = (data) => {
    //   io.to(data.room).emit(data.messages);
    } 
  
    socket.on("join_room", joinRoom);
    socket.on("leave_room", leaveRoom);
    socket.on("chat_text", chatText);
    socket.on("chat_image", chatImage);
  }
"use strict"

// Create a connection
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Start a connection
connection.start().then(
    function () {
        document.getElementById("sendButton").disabled = false;
    }
).catch(function (err) { return console.error(err.toString()) });


//Disable the send button until connection is established
document.getElementById("sendButton").disabled = true;

document.getElementById("sendButton").addEventListener("click", function (event) {

    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    // Adds to the submit button a handler that sends messages to the hub.
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

// Adds to the connection object a handler that receives messages from the hub and adds them to the list.
connection.on("ReceiveMessage",
    function (user, message) {
        var li = document.createElement("li");
        document.getElementById("messagesList").appendChild(li);
        li.textContent = `${user} says ${message}`;
    });

connection.On("GetMessage", async () => {
    Console.WriteLine("Enter message:");
    var message = await Console.In.ReadLineAsync();
    return message;
});



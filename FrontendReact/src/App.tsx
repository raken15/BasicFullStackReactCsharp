import { useState } from "react";
import { useApi } from "./api/useApi";
import { Message } from "./types/Message";

function App() {
  // Destructure API methods from our custom hook
  const { getAllMessages, getSingleMessage, addMessage, updateMessage, deleteMessage } = useApi();
  // State management for messages and UI inputs
  const [messages, setMessages] = useState<Message[]>([]);
  const [singleMessage, setSingleMessage] = useState<Message | null>(null);
  const [messageId, setMessageId] = useState<number>(0);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [updateId, setUpdateId] = useState<number>(0);
  const [updateText, setUpdateText] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  // Handler for getting all messages
  const handleGetAllMessages = async () => {
    try{
      const messages = await getAllMessages();
      setMessages(messages);
      setFeedback(`Fetched all messages successfully.`);
    }
    catch (error)
    {
      setFeedback("Error fetching all messages.");
    }
  };

  // Handler for getting a single message
  const handleGetSingleMessage = async () => {
    try{
      const fetchedMessage = await getSingleMessage(messageId);
      setSingleMessage(fetchedMessage);
      setFeedback(`Fetched message with id ${messageId}`);
    }
    catch (error){
      setFeedback(`Error fetching message with id ${messageId}.`);
    }
  };

  // Handler for creating a new message
  const handleAddMessage = async () => {
    try{
      // Note: createDate is not provided; backend will set it to the current date.
      const messageToAdd: Partial<Message> = { text: newMessageText };
      const addedMessage = await addMessage(messageToAdd);
      setFeedback(`Added message with id ${addedMessage.id}`);
      await handleGetAllMessages();
    } catch (error) {
      setFeedback("Error adding new message.");
    }
  };

  // Handler for updating a message
  const handleUpdateMessage = async () => {
    try{
      const messageToModify: Partial<Message> = { text: updateText};
      const modifiedMessage = await updateMessage(updateId, messageToModify);
      setFeedback(`updated message with id: ${modifiedMessage.id}`);
      await handleGetAllMessages();
    }
    catch (error) {
      setFeedback(`Error updating message with id ${updateId}`);
    }
  };

  // Handler for deleting a message
  const handleDeleteMessage = async () => {
    try{
      const result = await deleteMessage(deleteId);
      setFeedback(`Deleted message with id ${deleteId}: ${result.message}`);
      await handleGetAllMessages();
    }
    catch (error) {
      setFeedback(`Error deleting message with id ${deleteId}`);
    }
  };

  return (
    <div style={{padding : "2rem"}}>
      <h1>Raviv's Vite + React + Typescript Frontend</h1>
      {feedback && <p>{feedback}</p>}
      {/* Get All Messages */}
      <div style={{marginBottom: "1rem"}}>
        <button onClick={handleGetAllMessages}>Get All Messages</button>
      </div>
      {/* Get Message by ID */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Enter Message ID"
          value={messageId}
          onChange={(e) => setMessageId(parseInt(e.target.value))}
          />
        <button onClick={() => handleGetSingleMessage()}>Get Single Message</button>
        {
          singleMessage && (
            <div>
              <h3>Message Details:</h3>
              <p>ID: {singleMessage.id}</p>
              <p>Text: {singleMessage.text}</p>
              <p>Create Date: {singleMessage.createdDate.toString()}</p>
            </div>
          )
        }
      </div>
      {/* Add Message */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter new message text"
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <button onClick={() => handleAddMessage()}>Add Message</button>
      </div>
      {/* Update Message */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Enter Message ID"
          value={updateId}
          onChange={(e) => setUpdateId(parseInt(e.target.value))}
        />
        <input
          type="text"
          placeholder="Enter message text for update"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
        />
        <button onClick={() => handleUpdateMessage()}>Update Message</button>
      </div>
      {/* Delete Message */}
      <div style = {{marginBottom: "1rem"}}>
        <input
          type="number"
          placeholder="Enter Message ID"
          value={deleteId}
          onChange={(e) => setDeleteId(parseInt(e.target.value))}
        />
        <button onClick={ () => handleDeleteMessage()}>Delete Message</button>
      </div>
      {/* Display All Messages */}
      <div>
        <h2>All Messages:</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p>ID: {message.id}</p>
              <p>Text: {message.text}</p>
              <p>Create Date: {message.createdDate.toString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
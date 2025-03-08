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
      setFeedback("Failed to fetch message.");
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
    <div>
      <h1>Raviv's Vite + React + Typescript Frontend</h1>
      {feedback && <p>{feedback}</p>}
      {/* Get All Messages */}
      {/* <button onClick = {handleGetAllMessages}>Get All Messages</button> */}
      {/* Get Message by ID */}
      {/* <button onClick = {() => handleGetSingleMessage()}>Get Single Message</button> */}
      {/* Add Message */}
      {/* Update Message */}
      {/* Delete Message */}
    </div>
  );
};

export default App;
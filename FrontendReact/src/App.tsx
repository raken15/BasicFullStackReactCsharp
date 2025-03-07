import { useState } from "react";
import { useApi } from "./api/useApi";
import { Message } from "./types/Message";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";

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
  // // Existing state for the counter
  // const [countUI, setCount] = useState(0);

  // // New state for managing backend data
  // const [dataUI, setData] = useState<any>(null);
  // const [loadingUI, setLoading] = useState(false);
  // const [errorUI, setError] = useState("");

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
  }

  // // Function to fetch data when the button is clicked
  // const fetchData = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     // Make the GET request to your C# backend endpoint
  //     const response = await fetch("http://localhost:5194/api/messages");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Raviv's Vite + React + Typescript Frontend</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {countUI}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>

  //     {/* Button to trigger the GET request */}
  //     {/* Disable the button if fetch is in progress */}
  //     {/* to prevent multiple simultaneous requests */}
  //     <button onClick={fetchData} disabled={loadingUI}>
  //       {loadingUI ? "Processing request..." : "Fetch Data from Backend"}
  //     </button>

  //     {/* Display data or error message */}
  //     <div>
  //       {loadingUI ? (
  //         <div>Loading...</div>
  //       ) : errorUI ? (
  //         <div>Error: {errorUI}</div>
  //       ) : dataUI ? (
  //         <pre>{JSON.stringify(dataUI, null, 2)}</pre>
  //       ) : (
  //         <div>No data loaded. Click the button to fetch data.</div>
  //       )}
  //     </div>
  //   </>
  // );
};

export default App;
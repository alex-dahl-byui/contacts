import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Header.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Contact } from "./contacts/Contact.tsx";
import { Documents } from "./documents/Documents.tsx";
import { MessageList } from "./messages/message-list/MessageList.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Contact /> },
  { path: "/documents", element: <Documents /> },
  { path: "/messages", element: <MessageList /> },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

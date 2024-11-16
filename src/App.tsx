import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Header.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Contact } from "./contacts/Contact.tsx";
import { Documents } from "./documents/Documents.tsx";
import { MessageList } from "./messages/message-list/MessageList.tsx";
import { DocumentEdit } from "./documents/document-edit/DocumentEdit.tsx";
import { DocumentDetail } from "./documents/document-detail/DocumentDetail.tsx";
import { ContactDetail } from "./contacts/contact-detail/ContactDetail.tsx";
import { ContactEdit } from "./contacts/contact-edit/ContactEdit.tsx";
import { initializeApp } from "firebase/app";

const router = createBrowserRouter([
  {
    path: "/contacts",
    element: <Contact />,
    children: [
      { path: "/contacts/new", element: <ContactEdit /> },
      { path: "/contacts:id", element: <ContactDetail /> },
      { path: "/contacts:id/edit", element: <ContactEdit /> },
    ],
  },
  {
    path: "/documents",
    element: <Documents />,
    children: [
      { path: "/documents/new", element: <DocumentEdit /> },
      { path: "/documents:id", element: <DocumentDetail /> },
      { path: "/documents:id/edit", element: <DocumentEdit /> },
    ],
  },
  { path: "/messages", element: <MessageList /> },
]);

const firebaseConfig = {
  apiKey: "AIzaSyA2EZemEbGPJf3F-Dn2xNRxps1N68S6qmA",
  authDomain: "byui-contacts.firebaseapp.com",
  databaseURL: "https://byui-contacts-default-rtdb.firebaseio.com",
  projectId: "byui-contacts",
  storageBucket: "byui-contacts.firebasestorage.app",
  messagingSenderId: "117196816481",
  appId: "1:117196816481:web:7feb191c8a6453f80f2a20",
};
initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

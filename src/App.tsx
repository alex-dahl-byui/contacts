import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Header.tsx";
import { Contact } from "./contacts/Contact.tsx";

function App() {
  return (
    <>
      <Header />
      <Contact />
    </>
  );
}

export default App;

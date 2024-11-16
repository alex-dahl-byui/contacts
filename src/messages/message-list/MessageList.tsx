import "./MessageList.css";
import Card from "react-bootstrap/Card";
import { MessageEdit } from "../message-edit/MessageEdit.tsx";
import Container from "react-bootstrap/Container";
import { MessageItem } from "../message-item/MessageItem.tsx";
import { useGetMessages } from "../hooks/messages.ts";
import { ContactContextProvider } from "../../contacts/hooks/contact.tsx";

export const MessageList = () => {
  const { getMessages, addMessage } = useGetMessages();
  const currentSender = "Alex Dahl";

  const handleNewMessage = (subject: string, message: string) => {
    addMessage({
      subject,
      msgText: message,
      id: crypto.randomUUID(),
      sender: currentSender,
    });
  };

  return (
    <ContactContextProvider>
      <Container className="row">
        <Container className="col-md-5">
          <Card>
            <Card.Header as="h5">Messages</Card.Header>
            <Card.Body>
              {getMessages().map((message) => (
                <MessageItem message={message} key={message.id} />
              ))}
            </Card.Body>
            <Card.Footer>
              <MessageEdit onSendMessage={handleNewMessage} />
            </Card.Footer>
          </Card>
        </Container>
      </Container>
    </ContactContextProvider>
  );
};

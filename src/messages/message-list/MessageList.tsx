import "./MessageList.css";
import Card from "react-bootstrap/Card";
import { MessageEdit } from "../message-edit/MessageEdit.tsx";
import Container from "react-bootstrap/Container";
import { MessageItem } from "../message-item/MessageItem.tsx";
import { useGetMessages } from "../hooks/messages.ts";

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
    // <div className="row">
    //   <div className="col-md-5">
    //     <div className="panel panel-default">
    //       <div className="panel-heading">
    //         <div className="row pad-left-right">
    //           <span className="title pull-left">Messages</span>
    //         </div>
    //       </div>
    //       <div className="panel-body">
    //         <div className="row">
    //           <div className="col-xs-12">
    //             {/*            <!--Add tag to load the MessageItemComponent-->*/}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="panel-footer">
    //         {/*         <!--Add tag to load the MessageEditComponent-->*/}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

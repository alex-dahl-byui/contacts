import { useState } from "react";

interface MessageEditProps {
  onSendMessage: (subject: string, message: string) => void;
}

export const MessageEdit = ({ onSendMessage }: MessageEditProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSendMessage(subject, message);
  };

  const onClear = () => {
    setSubject("");
    setMessage("");
  };

  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <form id="document-edit">
          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                className="form-control"
                size={120}
                max="120"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="col-sm-12 form-group">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                id="message"
                className="form-control"
                max="255"
                size={120}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSend}
              >
                Send
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={onClear}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

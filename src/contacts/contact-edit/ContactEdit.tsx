import Card from "react-bootstrap/Card";
import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { IContact } from "../types.ts";
import { ContactContext } from "../hooks/contact.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { ContactItem } from "../contact-item/ContactItem.tsx";
import { Alert } from "react-bootstrap";

const emptyContact: IContact = {
  id: "0",
  email: "",
  name: "",
  phone: "",
  imageUrl: "",
  group: [],
};

export const ContactEdit = () => {
  const navigate = useNavigate();

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const { id } = useParams();
  const { getContact, updateContact, addContact, removeGroupMember } =
    useContext(ContactContext);
  const editMode = useMemo(() => !!id, [id]);

  const [contact, setContact] = useState<IContact>(emptyContact);
  const [originalContact, setOriginalContact] = useState<IContact | undefined>(
    undefined,
  );

  useEffect(() => {
    if (id) {
      setContact(getContact(id) ?? emptyContact);
    }
  }, [getContact, id]);

  useEffect(() => {
    if (editMode) {
      setOriginalContact(structuredClone(getContact(id ?? "0")));
    }
  }, [editMode, getContact, id]);

  const checkEmailValidity = (contactToCheck: IContact) => {
    const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
    return emailRegex.test(contactToCheck.email);
  };

  const checkPhoneNumberValidity = (contactToCheck: IContact) => {
    const emailRegex = new RegExp(
      /\D*([2-9]\d{2})\D*([2-9]\d{2})\D*(\d{4})\D*/,
    );
    return emailRegex.test(contactToCheck.phone);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFormDirty(true);

    const isEmailValid = checkEmailValidity(contact);
    const isPhoneValid = checkPhoneNumberValidity(contact);

    if (isPhoneValid && isEmailValid) {
      if (editMode) {
        updateContact(originalContact ?? emptyContact, contact);
      } else {
        addContact(contact);
      }

      navigate("/contacts");
    } else {
      setIsEmailValid(isEmailValid);
      setIsPhoneNumberValid(isPhoneValid);
    }
  };

  const onRemoveItem = (groupMemberID: string) => {
    removeGroupMember(contact.id, groupMemberID);
  };

  const onCancel = () => {
    navigate("/contacts");
  };

  const contactHasName = !!contact.name;
  const contactHasEmail = !!contact.email;
  const isFormValid = contactHasName && contactHasEmail;
  return (
    <Card className="panel panel-default">
      <Card.Body className="panel-body">
        <form id="contact-edit" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className={`form-control required ${contactHasName ? "" : "invalid"}`}
                maxLength={20}
                required
                value={contact.name}
                onChange={(event) =>
                  setContact((prevState) => ({
                    ...prevState,
                    name: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className={`form-control required ${contactHasEmail ? "" : "invalid"}`}
                maxLength={55}
                required
                value={contact.email}
                onChange={(event) =>
                  setContact((prevState) => {
                    const newContact = {
                      ...prevState,
                      email: event.target.value,
                    };

                    if (isFormDirty) {
                      setIsEmailValid(checkEmailValidity(newContact));
                    }

                    return newContact;
                  })
                }
              />
            </div>
          </div>
          {isEmailValid ? null : (
            <Alert variant="danger">You must enter a valid email</Alert>
          )}

          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                maxLength={55}
                value={contact.phone}
                onChange={(event) =>
                  setContact((prevState) => {
                    const newContact = {
                      ...prevState,
                      phone: event.target.value,
                    };

                    if (isFormDirty) {
                      setIsPhoneNumberValid(
                        checkPhoneNumberValidity(newContact),
                      );
                    }

                    return newContact;
                  })
                }
              />
            </div>
          </div>
          {isPhoneNumberValid ? null : (
            <Alert variant="danger">You must enter a valid phone number</Alert>
          )}

          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                maxLength={255}
                value={contact.imageUrl}
                onChange={(event) =>
                  setContact((prevState) => ({
                    ...prevState,
                    imageUrl: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="groupList">Group Contacts:</label>
              <div className="row" id="groupList" style={{ minHeight: "3rem" }}>
                {contact?.group && contact.group.length > 0 ? (
                  contact.group.map((contact, i) => (
                    <div key={i}>
                      <ContactItem contact={contact} />
                      <button
                        className="btn btn-danger col-sm-2 deleteButton"
                        onClick={() => onRemoveItem(contact.id)}
                        type="button"
                      >
                        X
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="dragMsg">Drag contacts in group here</span>
                )}
              </div>
            </div>
          </div>

          {isFormValid ? null : (
            <Alert variant="danger">
              The Name and Email fields are required.
            </Alert>
          )}

          <div className="row">
            <div className="col-xs-12 btn-toolbar">
              <button
                className="btn btn-success"
                type="submit"
                disabled={!isFormValid}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

import Container from "react-bootstrap/Container";
import { DocumentList } from "./document-list/DocumentList.tsx";
import { Outlet } from "react-router-dom";
import { DocumentContextProvider } from "./hooks/documents.tsx";

export const Documents = () => {
  return (
    <DocumentContextProvider>
      <Container className="row">
        <Container className="col-md-5">
          <DocumentList />
        </Container>

        <Container className="col-md-4">
          <Outlet />
        </Container>
      </Container>{" "}
    </DocumentContextProvider>
  );
};

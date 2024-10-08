import { useState } from "react";
import Container from "react-bootstrap/Container";
import { DocumentList } from "./document-list/DocumentList.tsx";
import { DocumentDetail } from "./document-detail/DocumentDetail.tsx";
import { Document } from "./types.ts";

export const Documents = () => {
  const [document, setDocument] = useState<Document | undefined>();

  return (
    <Container className="row">
      <Container className="col-md-5">
        <DocumentList setDocument={setDocument} />
      </Container>

      <Container className="col-md-4">
        {document ? <DocumentDetail document={document} /> : null}
      </Container>
    </Container>
  );
};

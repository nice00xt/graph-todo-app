import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { fetchNotes, deleteNote } from "~/queries/notes";
import NoteItem from "~/components/NoteItem";
import Container from "~/components/Container";
import CreateNote from "~/components/CreateNoteForm";
import Modal from "~/components/Modal";

export type NoteTypes = {
  id: number;
  title: string;
  description: string;
};

export default function AddNote() {
  const { data, refetch } = useQuery(fetchNotes);
  const [onDeleteNote] = useMutation(deleteNote);
  const [noteId, setNoteId] = useState(null);
  const [noteList, setNotes] = useState([]);

  useEffect(() => {
    if (data) setNotes(data.notes);
  }, [data]);

  const handleDeleteNote = async () => {
    try {
      const res = await onDeleteNote({
        variables: { id: noteId },
      });
    } finally {
      refetch();
      setNoteId(null);
    }
  };

  return (
    <Container>
      <Modal
        modalID="delete-item"
        title="So... you want to delete this note"
        description="Are you sure buddy?"
      >
        <div className="modal-action">
          <label htmlFor="delete-item" className="btn">
            Nop
          </label>
          <label
            htmlFor="delete-item"
            className="btn btn-primary"
            onClick={handleDeleteNote}
          >
            Yep do it
          </label>
        </div>
      </Modal>
      <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div className="lg:text-left py-12">
          <h2 className="text-base font-semibold tracking-wide uppercase">
            Add your note
          </h2>
          <CreateNote refetch={refetch} />
        </div>
        <div>
          <ul className="bg-blue-darker space-y-10 my-9 p-5 pt-8 rounded-xl">
            {noteList.map(({ id, title, description }: NoteTypes) => (
              <NoteItem
                key={id}
                id={id}
                title={title}
                description={description}
                setNoteId={setNoteId}
              />
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
NoteItem;

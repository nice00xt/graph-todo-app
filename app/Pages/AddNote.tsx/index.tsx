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
  const [noteList, setNotes] = useState([]);
  const [showAlert, setAlert] = useState(false);
  
  useEffect(() => {
    if (data) setNotes(data.notes);
  }, [data]);

  const handleDeleteNote = async (id: number) => {
    try {
      const res = await onDeleteNote({
        variables: { id },
      });
    } finally {
      refetch();
    }
  };

  const handleShowAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  return (
    <Container>
      {showAlert && (
        <div class="alert alert-success shadow-lg mt-9">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Note Successfully deleted!</span>
          </div>
        </div>
      )}
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
                handleDeleteNote={handleDeleteNote}
                onShowAlert={handleShowAlert}
              />
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
NoteItem;

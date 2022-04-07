import { AnnotationIcon, TrashIcon } from "@heroicons/react/outline";
import { NoteTypes } from "~/Pages/AddNote.tsx";

type NoteItem = { setNoteId: any } & NoteTypes

export default function NoteItem({
  id,
  title,
  description,
  setNoteId,
}: NoteItem) {
  return (
    <li className="relative mx-4 flex justify-between items-center">
      <div className="w-4/5">
        <div>
          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <AnnotationIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="ml-16 text-lg leading-6 font-medium">{title}</p>
        </div>
        <p className="mt-2 ml-16 text-base text-gray-500 text-ellipsis overflow-hidden ...">
          {description}
        </p>
      </div>
      <label htmlFor="delete-item" className="btn btn-circle" onClick={() => setNoteId(id)}>
        <TrashIcon className="h-6 w-6" aria-hidden="true" />
      </label>
    </li>
  );
}

import { useState, Fragment, useEffect } from "react";
import { TrashIcon, DocumentTextIcon } from "@heroicons/react/outline";
import { NoteTypes } from "~/Pages/AddNote.tsx";

type NoteItem = {
  handleDeleteNote: any;
  onShowAlert: any;
} & NoteTypes;

export default function NoteItem({
  id,
  title,
  description,
  handleDeleteNote,
  onShowAlert
}: NoteItem) {
  const [isAlertOpen, setAlert] = useState(false);
  const [timerId, setTimerId] = useState(undefined);
  const [counter, setCounter] = useState(10);

  const handleDelete = (id: number) => {
    const timerDelete = setTimeout(() => {
      handleDeleteNote(id);
      onShowAlert();
    }, 10000);
    setTimerId(timerDelete);
    setAlert(true);
  };

  const onUndo = () => {
    setCounter(10)
    clearTimeout(timerId);
    setAlert(false);
  }

  const renderProgress = () => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      console.log('test')
    }
    const progressColor = counter < 6 ? 'progress-error' : 'progress-success'
    return <progress className={`progress ${progressColor} w-8 ease-linear`} value={counter} max="9"></progress>
  }
  
  return (
    <li className="relative mx-4 flex justify-between items-center">
      {isAlertOpen ? (
        <div className="alert shadow-lg">
          <div>
            <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
            <span>1 Note removed</span>
          </div>
          <div className="flex-none">
            {renderProgress()}
            <button className="btn btn-sm btn-primary" onClick={() => onUndo()}>Undo</button>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="w-4/5">
            <div>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium">{title}</p>
            </div>
            <p className="mt-2 ml-16 text-base text-gray-500 text-ellipsis overflow-hidden ...">
              {description}
            </p>
          </div>
          <label
            htmlFor="delete-item"
            className="btn btn-circle"
            onClick={() => handleDelete(id)}
          >
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          </label>
        </Fragment>
      )}
    </li>
  );
}

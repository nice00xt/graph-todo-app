import { FC, forwardRef, Fragment } from "react";

type ModalTypes = {
  modalID: string;
  title: string;
  description: string;
};

export const Modal: FC<ModalTypes> = ({
  modalID,
  title,
  description,
  children,
}) => {
  return (
    <Fragment>
      <input type="checkbox" id={modalID} className="modal-toggle"></input>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{description}</p>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;

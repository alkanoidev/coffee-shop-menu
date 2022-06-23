import React, { useEffect } from "react";
import Button from "../Buttons/Button";
import ReactPortal from "../ReactPortal";
import "./style.scss";

export default function ItemDeleteDialogue({
  isOpen,
  handleClose,
  setDialogue,
  handleDelete
}) {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal>
      <div
        className="modal"
        onClick={() => {
          handleClose();
        }}
      >
        <form id="modal" className="form" onClick={(e) => e.stopPropagation()}>
          <p>Are you sure you want to delete the item?</p>
          <div>
            <Button onClick={handleClose} title="Cancel" />
            <Button
              onClick={() => {
                setDialogue({ isOpened: false, isConfirmed: true });
                handleDelete()
                handleClose();
              }}
              title="Delete"
            />
          </div>
        </form>
      </div>
    </ReactPortal>
  );
}

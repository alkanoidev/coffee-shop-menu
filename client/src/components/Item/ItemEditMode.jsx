import React from "react";
import Button from "../Buttons/Button";
import { MdOutlineClose } from "react-icons/md";

export default function ItemEditMode({
  handleChange,
  setEditMode,
  handleUpdate,
  item
}) {
  return (
    <form>
      <textarea
        type="text"
        rows="2"
        name="name"
        placeholder="name"
        value={item.name}
        onChange={(e) => {
          handleChange(e);
        }}
      ></textarea>
      <textarea
        rows="5"
        name="description"
        value={item.description}
        onChange={(e) => {
          handleChange(e);
        }}
        placeholder="description"
        className="description"
      ></textarea>
      <input
        value={item.price}
        onChange={(e) => {
          handleChange(e);
        }}
        type="text"
        placeholder="price"
        name="price"
      />
      <div className="buttons">
        <Button
          title={<MdOutlineClose />}
          styles="text-lg font-bold w-1/4 px-0 py-0"
          onClick={(e) => {
            e.preventDefault();
            setEditMode(false);
          }}
        />
        <Button
          title="Edit"
          onClick={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        />
      </div>
    </form>
  );
}

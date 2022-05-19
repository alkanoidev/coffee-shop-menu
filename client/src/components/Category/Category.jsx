import "./style.scss";

export default function Category({
  categoryName,
  onClick,
  edit = false,
  onChange,
  newName,
}) {
  return (
    <div className="Category" onClick={onClick}>
      <div>
        <img
          src={`/src/pages/Categories/icons/${categoryName}.png`}
          alt=""
          className="w-10 h-10"
        />
      </div>
      {edit ? (
        <input type="text" value={newName} onChange={onChange} />
      ) : (
        <h1>{categoryName || "Category"}</h1>
      )}
    </div>
  );
}

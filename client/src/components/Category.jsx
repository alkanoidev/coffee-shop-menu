export default function Category({ categoryName, onClick, edit=false, onChange, newName }) {
  return (
    <div
      className="flex flex-col items-center gap-2 justify-center w-20"
      onClick={onClick}
    >
      <div className="transition w-20 h-20 rounded-full bg-gradient-to-r from-brown to-green-600 grid place-content-center text-5xl text-zinc-900 hover:scale-110 hover:cursor-pointer">
        <img
          src={`/src/pages/Categories/icons/${categoryName}.png`}
          alt=""
          className="w-10 h-10"
        />
      </div>
      {edit ? (
        <input type="text" className="focus:outline-none focus:ring-1 focus:ring-brown p-1" value={newName} onChange={onChange} />
      ) : (
        <h1 className="text-md text-center">{categoryName || "Category"}</h1>
      )}
    </div>
  );
}

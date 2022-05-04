export default function Category({ icon, categoryName }) {
  return (
    <div className="flex flex-col items-center gap-2 justify-center w-20">
      <div className="transition w-20 h-20 rounded-full bg-gradient-to-r from-brown to-green-600 grid place-content-center text-5xl text-zinc-900 hover:scale-110 hover:cursor-pointer">
        <img
          src={`/src/pages/Categories/icons/${icon}`}
          alt=""
          className="w-10 h-10"
        />
      </div>
      <h1 className="text-md text-center">{categoryName || "Category"}</h1>
    </div>
  );
}

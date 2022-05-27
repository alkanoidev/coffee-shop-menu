import Illustration from "../assets/404illustration.png";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl">404</h1>
      <h2>Page Not Found</h2>
      <img src={Illustration} alt="" width="300px" />
    </div>
  );
}

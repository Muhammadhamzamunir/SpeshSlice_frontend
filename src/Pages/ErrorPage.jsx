import { useRouteError } from "react-router-dom";
import Button from "../Components/Button";

export default function ErrorPage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-red-500 text-lg mb-4">
          An error #404 has occurred.
        </p>
        <p className="text-gray-600 text-sm mb-8">
        </p>
        <div className="space-x-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.href = "/"}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

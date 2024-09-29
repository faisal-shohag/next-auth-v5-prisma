import { activateUser } from "../../actions/action";


const ActivationPage = async ({ params }) => {
  // console.log("Params",params.jwt)
  const result = await activateUser(params.jwt);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result.message === "!exist" ? (
        <p className="text-red-500 text-2xl">The user does not exist</p>
      ) : result.message === "verified" ? (
        <p className="text-red-500 text-2xl">The user is already activated</p>
      ) : result.message === "success" ? (
        <p className="text-green-500 text-2xl">
          Success! The user is now activated
        </p>
      ) : (
        <p className="text-yellow-500 text-2xl">Oops! Something went wrong!</p>
      )}
    </div>
  );
};

export default ActivationPage;
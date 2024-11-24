import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch()


  const navigate = useNavigate

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL
        }),
      });

      const data = await res.json()
      if (res.ok) {
        // dispatch(signInSucess(data))
        navigate("/")
      }
      console.log(resultsFromGoogle);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        className="w-96 bg-blue-500 text-white rounded-md p-4 mt-3"
      >
        Sign in with google
      </button>
    </div>
  );
};

export default OAuth;

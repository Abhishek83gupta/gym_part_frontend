import { useState } from "react"
import { Link , Navigate} from "react-router-dom";
import { useSignup } from '../Hooks/useSignup.js'
import { useAuthContext } from "../Hooks/useAuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, isLoading, error} = useSignup()

  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
   
   await signup(email, password)
   setEmail('')
   setPassword('')
  };

  return ( !user ? 
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Signup</h3>

        <label className="mb-2 font-semibold">Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 font-semibold">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />

        <h1>Already have an Account  <Link to='/login' className="text-[#1aac83]">Login</Link></h1>

        <button 
          className="w-full bg-[#1aac83] text-white p-2 rounded hover:bg-[#37a082]"
          disabled={isLoading}
        >
          Signup
        </button>
        {error && <div className="error text-red-500 mt-2">{error}</div>}

      </form>
    </div>
  : <Navigate to='/'/>);
}

export default Signup;

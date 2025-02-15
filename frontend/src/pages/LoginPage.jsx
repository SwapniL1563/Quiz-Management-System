import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { loginUser } from "../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(username, password);
      if (response.message === "Login successful") {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* Login Form */}
      <div className="w-96 p-6 m-3 md:m-0 shadow-lg bg-white rounded">
        <h2 className="text-xl font-semibold text-center mb-2">Login</h2>
        {error && <p className="text-[#292929] text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-[#30B2AD]">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

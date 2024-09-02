import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid email.";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="name"
          className="border p-2 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        <p className="text-red-500">{formErrors.firstname}</p>

        <input
          type="email"
          placeholder="email"
          className="border p-2 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <p className="text-red-500">{formErrors.email}</p>
        <input
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <p className="text-red-500">{formErrors.password}</p>

        <button
          disabled={loading}
          className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

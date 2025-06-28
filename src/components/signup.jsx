import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { useRef } from "react"; // At the top of your file

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    // Update file name state if a file is selected
    if (name === "profile_pic" && files && files[0]) {
      setFileName(files[0].name);
    } else if (name === "profile_pic" && !files?.length) {
      // Handle case where user cancels file selection
      setFileName("No file chosen");
    }
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error?.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {/* Custom styled button */}
          <div className="flex items-center gap-2">
            {" "}
            {/* Use flex to align button and text */}
            <Button
              type="button" // Important: Prevents form submission
              onClick={handleFileButtonClick}
            >
              Choose File
            </Button>
            <span className="text-sm text-gray-400">
              {" "}
              {/* Style the file name text */}
              {fileName}
            </span>
          </div>
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;

import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../app";
import Navbar from "../../components/layouts/navbar/Navbar";
import "./UserPortal.css";
import upload from "./upload-pic.png";
import axios from "axios";

export const UserPortal = () => {
  const authenticateUser = useContext(userContext);
  console.log(authenticateUser, "from user portal");
  const [selectedFile, setSelectedFile] = useState(null);
  const [personalcred, setpersonalcred] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phoneno: "",
    country: "",
    street_address: "",
    city: "",
    region: "",
    postal_code: "",
  });
  const [photo, setphoto] = useState(null);

  //photo on change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      localStorage.setItem("selectedFile", e.target.result);
    };
    console.log(photo);
    reader.readAsDataURL(file);
    console.log(file);
  };
  //personal info on change
  const onchange = (e) => {
    setpersonalcred({ ...personalcred, [e.target.name]: e.target.value });
    // console.log(personalcred)
    // console.log("onchange is active")
  };
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("personalcred"));
    if (savedData) {
      setpersonalcred(savedData);
    }
  }, []);

  //personal info submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      phoneno,
      country,
      street_address,
      city,
      postal_code,
      region,
    } = personalcred;
    alert("your personal information has been saved");
    try {
      const response = await axios.put(
        `http://localhost:2000/user/update/${id}`,
        {
          userid: authenticateUser.user.uid,
          email: email,
          first_name: first_name,
          last_name: last_name,
          phoneno: phoneno,
          country: country,
          street_address: street_address,
          city: city,
          postal_code: postal_code,
          region: region,
        }
      );
      console.log("Post", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Navbar darkTheme={true} />
      <h1 className="text-center text-primary mt-9 ">Profile</h1>
      <p className="mt-1 text-sm leading-6 text-gray-600 text-center text-primary">
        This information will be only displayed to you.
      </p>

      <div className="ml-9 mr-9 wrapper">
        <form className="text-primary" onSubmit={handlesubmit}>
          <div className="space-y-12 wrapper">
            <div className="infocontainer">
              {/* photo */}
              <div className="info-photo">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full ">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900 mb-5 text-center"
                    >
                      Photo
                    </label>
                    <div className="text-center photo-inside">
                      <img
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : upload
                        }
                        alt=""
                        required
                        onChange={onchange}
                        className={`${selectedFile ? "photo-slot" : ""}`}
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {!selectedFile ? (
                        <>
                          <p className="pl-3">
                            <span>Upload a file </span>
                          </p>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-x-3 justify-center">
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-5"
                        onClick={() => {
                          document.getElementById("file-upload").click();
                        }}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* personal information */}
              <div className="info-photo-text">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          onChange={onchange}
                          required
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          onChange={onchange}
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          onChange={onchange}
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        phone no.
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneno"
                          name="phoneno"
                          onChange={onchange}
                          required
                          minLength={10}
                          maxLength={10}
                          type="tel"
                          autoComplete="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          onChange={onchange}
                          required
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>select</option>
                          <option>India</option>
                          <option>Canada</option>
                          <option>United States</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street_address"
                          id="street_address"
                          onChange={onchange}
                          required
                          autoComplete="street_address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          onChange={onchange}
                          required
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          onChange={onchange}
                          required
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="postal_code"
                          id="postal_code"
                          onChange={onchange}
                          required
                          maxLength={6}
                          minLength={6}
                          autoComplete="postal_code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6  ">
                  {/* <button type='submit' id='clear' className='className="text-sm font-semibold leading-6 mr-4'>
                    Clear
                  </button> */}
                  <button
                    type="submit"
                    id="save"
                    className='className="text-sm font-semibold leading-6 mr-0 '
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

import React from "react";

const Footer = () => {
  return (
    <section className="bg-gray-800 p-20">
      <div className="container mx-auto">
        <h2 className="text-white">
          If you have any queries feel free to ask here.
        </h2>

        <form className="mt-12 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">
              Name:
            </label>
            <input
              type="text"
              name="user_name"
              id="name"
              className="w-full p-2 rounded-md outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              name="user_email"
              id="email"
              className="w-full p-2 rounded-md outline-none"
              placeholder="Enter your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="query" className="block text-white mb-2">
              Query:
            </label>
            <textarea
              className="w-full p-2 rounded-md outline-none"
              name="message"
              id="query"
              placeholder="Type your Query"
            ></textarea>
          </div>

          <div className="mb-4">
            <input
              type="submit"
              value="Submit"
              className="inline-block text-white text-decoration-none bg-blue-500 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-blue-600 rounded-lg"
            />
          </div>
        </form>

        <p className="mt-4 text-white text-sm">
          &copy; 2024 BookRealm. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;

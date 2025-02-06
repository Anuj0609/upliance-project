import React, { useState, useEffect } from "react";

function UserDataForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  // const [userId, setUserId] = useState<string | null>(null);
  const [savedData, setSavedData] = useState<typeof formData | null>(null);
  const [isFormModified, setIsFormModified] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const savedUserData = localStorage.getItem(storedUserId);
      if (savedUserData) {
        setSavedData(JSON.parse(savedUserData));
      }
      // setUserId(storedUserId);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setIsFormModified(true);
      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const generatedUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
    // setUserId(generatedUserId);

    localStorage.setItem(generatedUserId, JSON.stringify(formData));
    localStorage.setItem("userId", generatedUserId);
    setSavedData(formData);
    setIsFormModified(false);

    setFormData({ name: "", address: "", email: "", phone: "" });
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormModified) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormModified]);

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="w-full p-6 ">
      <div className="flex space-x-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-1/2 bg-gray-300 p-6 m-5"
        >
          <div className="flex flex-col">
            <div className="text-2xl font-semibold text-center mb-6">
              User Data Form
            </div>
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        {savedData && (
          <div className="w-1/2 m-5 p-6 rounded bg-gray-400">
            <h3 className="text-lg font-semibold mb-2">Saved User Data:</h3>
            <p>
              <strong>Name:</strong> {savedData.name}
            </p>
            <p>
              <strong>Address:</strong> {savedData.address}
            </p>
            <p>
              <strong>Email:</strong> {savedData.email}
            </p>
            <p>
              <strong>Phone:</strong> {savedData.phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDataForm;

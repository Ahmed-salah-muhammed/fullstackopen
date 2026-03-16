import { useState } from "react";

export default function GeneralInfo() {
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("Ahmed Salah Muhammed");
  const [email, setEmail] = useState("ahmedsalah219013@gmail.com");
  const [phone, setPhone] = useState("+20 122 524 6488");

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <section className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">
          General Information
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 transition"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Full Name
            </span>
            <p className="text-lg font-medium text-gray-900">{fullName}</p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Email
            </span>
            <p className="text-gray-700">{email}</p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Phone
            </span>
            <p className="text-gray-700">{phone}</p>
          </div>
        </div>
      )}
    </section>
  );
}

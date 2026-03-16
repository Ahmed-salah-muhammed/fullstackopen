import { useState } from "react";

export default function Education() {
  const [isEditing, setIsEditing] = useState(false);

  const [school, setSchool] = useState(
    "Cairo University, Faculty of Urban & Regional Planning",
  );
  const [degree, setDegree] = useState("Bachelor of Urban & Regional Planning");
  const [date, setDate] = useState("09/2019 – 07/2024");

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <section className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight ">
          Education
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
              School / University
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Degree / Title of Study
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Study
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Education
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900">{school}</h3>
          <p className="text-gray-700 font-medium">{degree}</p>
          <p className="text-sm text-gray-500 italic">{date}</p>
        </div>
      )}
    </section>
  );
}

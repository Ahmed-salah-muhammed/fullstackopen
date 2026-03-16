import { useState } from "react";

export default function Experience() {
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState("Urban Planning Solutions Office");
  const [position, setPosition] = useState("GIS Engineer");
  const [tasks, setTasks] = useState(
    "Conducted spatial data analysis to support urban planning.\nDesigned and deployed Survey123 forms.",
  );
  const [duration, setDuration] = useState("01/2025 – 10/2025");

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <section className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight ">
          Practical Experience
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
              Company Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Responsibilities
            </label>
            <textarea
              rows="4"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Experience
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{company}</h3>
            <p className="text-blue-500 font-semibold">{position}</p>
            <p className="text-sm text-gray-400 italic mb-2">{duration}</p>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {tasks}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

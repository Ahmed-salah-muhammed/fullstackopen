export default function Header() {
  return (
    <header className="max-w-7xl mx-auto my-8 p-6 border-b-2 border-slate-100 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
      <div className="text-center md:text-left w-full md:w-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ahmed <span className="text-blue-600">Salah</span>
        </h1>
        <p className="text-slate-500 font-medium mt-2 md:mt-1 text-sm md:text-base">
          GIS Engineer & Full-Stack Developer
        </p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto">
        <span className="bg-slate-100 text-slate-600 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          CV Builder
        </span>
        <span className="bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase border border-blue-100 tracking-wider">
          React Project
        </span>
      </div>
    </header>
  );
}

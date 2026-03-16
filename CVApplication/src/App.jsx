import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Header />
      <main className="space-y-2">
        <GeneralInfo />
        <Education />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

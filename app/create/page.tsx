import CreateWizard from "@/components/CreateWizard";

export default function CreatePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-normal tracking-tight text-ink sm:text-5xl">
          Build a Bouquet
        </h1>
      </header>
      <CreateWizard />
    </div>
  );
}

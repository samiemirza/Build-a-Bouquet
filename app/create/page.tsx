import CreateWizard from "@/components/CreateWizard";

export default function CreatePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
      <header className="mb-5 text-center sm:mb-6">
        <h1 className="text-3xl font-normal tracking-tight text-ink sm:text-5xl">
          Build a Bouquet
        </h1>
      </header>
      <CreateWizard />
    </div>
  );
}

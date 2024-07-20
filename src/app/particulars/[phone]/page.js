import ParticularsComponents from "../../components/ParticularsComponent";

export default function ParticularsPage({params}) {
  return (
    <main className="flex flex-col min-h-min justify-between bg-transparent pb-10">
      <ParticularsComponents phone={params.phone} />
    </main>
  );
}

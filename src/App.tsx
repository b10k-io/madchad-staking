import Header from "./components/layout/Header";
import WidgetGroup from "./components/widgets/WidgetGroup";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex flex-col gap-16">
        <Header />
        <WidgetGroup />
      </div>
    </div>
  );
}

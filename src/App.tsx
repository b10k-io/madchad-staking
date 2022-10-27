import DepositList from "./components/deposits/DepositList";
import Header from "./components/layout/Header";
import RoundList from "./components/rounds/RoundList";
import WidgetGroup from "./components/widgets/WidgetGroup";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex flex-col justify-between">
      <div className="flex flex-col gap-16">
        <Header />
        <WidgetGroup />
        <RoundList />
        <DepositList />
      </div>
      <Footer />
    </div>
  );
}

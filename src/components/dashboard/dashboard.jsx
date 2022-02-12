import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";

export default function Dashboard() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 xl:gap-16">
        <div className="md:col-span-2 h-96">
          <BarChart />
        </div>
        <div>
          <PieChart />
        </div>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  );
}

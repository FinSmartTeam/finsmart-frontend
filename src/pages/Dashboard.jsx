import MobileLayout from "../layouts/MobileLayout.jsx";

const Dashboard = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold italic">Dashboard Beranda</h2>
        <div className="p-10 bg-card-dark border border-dashed border-border-dark rounded-3xl text-center">
          <p className="text-text-mutedDark text-sm">Konten Dashboard akan kita bangun di sini.</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
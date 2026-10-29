export default function PatientDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome, Sarah Jenkins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Upcoming Appointments</h2>
          <p className="text-xs text-slate-500">Dr. Syed Izhar · Cardiology · Tomorrow 10:00 AM</p>
          <span className="inline-block mt-2 text-[10px] font-bold text-[#226E4B] bg-[#E2F0E8] px-2 py-1 rounded-full">Confirmed</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Active Prescriptions</h2>
          <p className="text-xs text-slate-500">Metformin 500mg · 2 refills remaining</p>
          <button className="mt-3 text-xs font-bold text-white bg-[#226E4B] px-3 py-1.5 rounded-lg">Request Renewal</button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Recent Clinical Reports</h2>
          <p className="text-xs text-slate-500">Blood Panel · Apr 20, 2026 · Normal</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-center">
          <button className="w-full py-3 bg-[#226E4B] text-white font-bold rounded-xl shadow-lg">Book New Appointment</button>
        </div>
      </div>
    </div>
  );
}
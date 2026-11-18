"use client";
import React, { useState, useEffect } from "react";

const DOCTORS = ["Dr. Syed Izhar Hussain", "Dr. Amina Rehman", "Dr. Farooq Ahmed"];
const MODES = ["Clinic Visit", "Telehealth"];
const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function AppointmentsPage() {
  const [mounted, setMounted] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "Dr. Syed Izhar Hussain",
    timeSlot: "12:00 PM",
    mode: "Clinic Visit",
  });
  const [schedule, setSchedule] = useState([
    {
      id: "#APT-2041",
      patient: "Ayesha Khan",
      doctor: "Dr. Syed Izhar Hussain",
      time: "09:30 AM",
      status: "Completed",
    },
    {
      id: "#APT-2042",
      patient: "Zainab Bibi",
      doctor: "Dr. Syed Izhar Hussain",
      time: "11:00 AM",
      status: "In Consultation",
    },
  ]);
  const [todayBookings, setTodayBookings] = useState(14);

  useEffect(() => setMounted(true), []);

  const handleBookAppointment = (event) => {
    event.preventDefault();
    const lastNumber = schedule.reduce((max, appt) => {
      const number = Number(appt.id.replace("#APT-", ""));
      return number > max ? number : max;
    }, 0);
    const nextId = `#APT-${lastNumber + 1}`;
    const record = {
      id: nextId,
      patient: newAppointment.patientName,
      doctor: newAppointment.doctorName,
      time: newAppointment.timeSlot,
      status: "Scheduled",
    };
    setSchedule([...schedule, record]);
    setTodayBookings(todayBookings + 1);
    setNewAppointment({
      patientName: "",
      doctorName: "Dr. Syed Izhar Hussain",
      timeSlot: "12:00 PM",
      mode: "Clinic Visit",
    });
    setIsBookingModalOpen(false);
  };

  if (!mounted) return <div className="p-4 text-xs text-slate-500 font-medium">Loading appointments...</div>;

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Appointments Schedule Telemetry</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Manage patient bookings and consultation queues</p>
        </div>
        <button
          type="button"
          onClick={() => setIsBookingModalOpen(true)}
          className="bg-[#113F2A] hover:bg-[#1b5238] text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all"
        >
          + Book New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Today Bookings</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{todayBookings} Appointments</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Capacity Status</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">74% Capacity</h3>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Consultation Modes</span>
          <h3 className="text-2xl font-bold text-[#226E4B] mt-1">10 Clinic 4 Telehealth</h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 lg:p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4">Master Schedule Table</h2>
        <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">APT ID</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Patient Name</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Doctor</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Time</th>
                <th className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {schedule.map((appt) => (
                <tr key={appt.id}>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">{appt.id}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3 font-bold text-slate-900">{appt.patient}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">{appt.doctor}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3">{appt.time}</td>
                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap py-3"><span className="bg-emerald-50 text-[#226E4B] px-2.5 py-1 rounded-full font-bold">{appt.status}</span></td>
                </tr>
              ))}
              {schedule.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-8 sm:px-4 sm:py-8 whitespace-nowrap text-center text-sm text-slate-500"
                  >
                    No appointments scheduled
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 shadow-2xl relative border border-emerald-800/20">
            <h2 className="text-lg font-bold text-slate-900">Schedule New Appointment</h2>
            <p className="mt-1 text-xs text-slate-500">Reserve consultation slot for patient</p>
            <form onSubmit={handleBookAppointment} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  value={newAppointment.patientName}
                  onChange={(event) => setNewAppointment({ ...newAppointment, patientName: event.target.value })}
                  placeholder="Enter patient full name"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Doctor</label>
                <select
                  value={newAppointment.doctorName}
                  onChange={(event) => setNewAppointment({ ...newAppointment, doctorName: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                >
                  {DOCTORS.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Time Slot</label>
                <select
                  value={newAppointment.timeSlot}
                  onChange={(event) => setNewAppointment({ ...newAppointment, timeSlot: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Consultation Mode</label>
                <select
                  value={newAppointment.mode}
                  onChange={(event) => setNewAppointment({ ...newAppointment, mode: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#226E4B] focus:ring-2 focus:ring-[#226E4B]/15"
                >
                  {MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#113F2A] hover:bg-[#1b5238] text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

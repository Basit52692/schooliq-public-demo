"use client";

import { useState } from "react";
import AttendanceDemo from "./AttendanceDemo";
import FeesDemo from "./FeesDemo";
import ReportsDemo from "./ReportsDemo";

import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  Wallet,
  Clock3,
  Users,
  BarChart3,
  LockKeyhole,
} from "lucide-react";

const students = [
  { id: "ST-001", name: "Ali Ahmed", grade: "Grade 8", status: "Active" },
  { id: "ST-002", name: "Sara Khan", grade: "Grade 7", status: "Active" },
  { id: "ST-003", name: "Hamza Malik", grade: "Grade 9", status: "Active" },
  { id: "ST-004", name: "Ayesha Noor", grade: "Grade 6", status: "Active" },
  { id: "ST-005", name: "Bilal Hassan", grade: "Grade 8", status: "Active" },
  { id: "ST-006", name: "Fatima Ali", grade: "Grade 9", status: "Inactive" },
  { id: "ST-007", name: "Zain Abbas", grade: "Grade 7", status: "Active" },
  { id: "ST-008", name: "Hira Malik", grade: "Grade 6", status: "Active" },
];

type Section = "Dashboard" | "Students" | "Attendance" | "Fees" | "Reports";

export default function DemoPage() {
  const [section, setSection] = useState<Section>("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query);
    const matchesClass =
      classFilter === "All" || student.grade === classFilter;
    return matchesSearch && matchesClass;
  });

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Students", icon: GraduationCap },
    { name: "Attendance", icon: CalendarCheck },
    { name: "Fees", icon: Wallet },
    { name: "Reports", icon: BarChart3 },
  ] as const;

  const kpis = [
    { title: "Total Students", value: "8", icon: Users },
    { title: "Attendance Rate", value: "75.0%", icon: CalendarCheck },
    { title: "Fees Collected", value: "PKR 55,000", icon: Wallet },
    { title: "Outstanding Fees", value: "PKR 37,000", icon: Clock3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <aside className="bg-slate-950 p-5 text-white md:min-h-screen md:w-64">
        <h1 className="text-2xl font-bold">SchoolIQ</h1>
        <p className="mb-8 text-xs text-slate-400">
          Public Portfolio Demo
        </p>

        <nav aria-label="Demo sections" className="flex gap-2 overflow-x-auto md:flex-col">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                aria-current={section === item.name ? "page" : undefined}
                onClick={() => {
                  setSection(item.name);
                }}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  section === item.name
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">
              {section === "Dashboard" ? "Executive Dashboard" : section}
            </h2>
            <p className="text-sm text-slate-500">
              School ERP & Analytics System
            </p>
          </div>

          <span className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-800">
            <LockKeyhole size={15} />
            Read-only Demo
          </span>
        </header>

        {section === "Dashboard" && (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-slate-500">
                        {kpi.title}
                      </p>
                      <Icon className="text-blue-600" size={21} />
                    </div>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Fee Collection Overview</h3>
              <p className="mt-1 text-sm text-slate-500">Financial summary based on fictional demo invoices</p>
              <div className="my-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-500">Total Invoiced</p>
                  <p className="mt-1 text-xl font-bold">PKR 92,000</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Collected</p>
                  <p className="mt-1 text-xl font-bold text-emerald-600">PKR 55,000</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Outstanding</p>
                  <p className="mt-1 text-xl font-bold text-amber-600">PKR 37,000</p>
                </div>
              </div>
              <div className="flex h-5 overflow-hidden rounded-full bg-slate-100" role="img" aria-label="59.8 percent collected, 40.2 percent outstanding">
                <div className="bg-emerald-500" style={{ width: "59.78%" }} />
                <div className="bg-amber-400" style={{ width: "40.22%" }} />
              </div>
              <div className="mt-3 flex justify-between gap-2 text-xs text-slate-500">
                <span>Collected: 59.8%</span>
                <span>Outstanding: 40.2%</span>
              </div>
            </div>
          </>
        )}

        
        {section === "Students" && (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">
      <div>
        <h3 className="text-lg font-semibold">Student Directory</h3>
        <p className="text-sm text-slate-500">
          Showing {filteredStudents.length} of {students.length} demo students
        </p>
      </div>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
        Sample Records
      </span>
    </div>

    <div className="grid gap-3 p-5 sm:grid-cols-2">
      <input
        type="search"
        placeholder="Search by student name or ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
      />

      <select
        value={classFilter}
        onChange={(e) => setClassFilter(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
      >
        <option value="All">All Classes</option>
        <option value="Grade 6">Grade 6</option>
        <option value="Grade 7">Grade 7</option>
        <option value="Grade 8">Grade 8</option>
        <option value="Grade 9">Grade 9</option>
      </select>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-4">Student ID</th>
            <th className="p-4">Student Name</th>
            <th className="p-4">Class</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="border-t border-slate-100 hover:bg-slate-50"
            >
              <td className="p-4 font-medium">{student.id}</td>
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.grade}</td>
              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    student.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredStudents.length === 0 && (
        <div className="p-10 text-center text-sm text-slate-500">
          No students found. Try another search or class.
        </div>
      )}
    </div>

    <div className="border-t border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
      Read-only demonstration. Student records are fictional.
    </div>
  </div>
        )}

        {section === "Attendance" && <AttendanceDemo />}

        {section === "Fees" && <FeesDemo />}

        {section === "Reports" && <ReportsDemo />}

        <p className="mt-8 text-xs text-slate-400">
          Portfolio demonstration using fictional sample data.
          No live school information is displayed.
        </p>
      </main>
    </div>
  );
}

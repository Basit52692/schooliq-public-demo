
"use client";

import { useState } from "react";

const attendanceRecords = [
  { id: "ST-001", name: "Ali Ahmed", grade: "Grade 8", status: "Present" },
  { id: "ST-002", name: "Sara Khan", grade: "Grade 7", status: "Present" },
  { id: "ST-003", name: "Hamza Malik", grade: "Grade 9", status: "Absent" },
  { id: "ST-004", name: "Ayesha Noor", grade: "Grade 6", status: "Present" },
  { id: "ST-005", name: "Bilal Hassan", grade: "Grade 8", status: "Late" },
  { id: "ST-006", name: "Fatima Ali", grade: "Grade 9", status: "Present" },
  { id: "ST-007", name: "Zain Abbas", grade: "Grade 7", status: "Absent" },
  { id: "ST-008", name: "Hira Malik", grade: "Grade 6", status: "Present" },
];

export default function AttendanceDemo() {
  const [selectedClass, setSelectedClass] = useState("All");

  const filtered = attendanceRecords.filter(
    (student) =>
      selectedClass === "All" || student.grade === selectedClass
  );

  const present = filtered.filter((s) => s.status === "Present").length;
  const absent = filtered.filter((s) => s.status === "Absent").length;
  const late = filtered.filter((s) => s.status === "Late").length;

  const attendanceRate = filtered.length
    ? ((present + late) / filtered.length) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Attendance Overview</h3>
        <p className="mt-1 text-sm text-slate-500">
          Fictional attendance records — demonstration only
        </p>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-2"
        >
          <option value="All">All Classes</option>
          {["Grade 6", "Grade 7", "Grade 8", "Grade 9"].map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Present", value: present, color: "text-emerald-600" },
          { label: "Absent", value: absent, color: "text-red-600" },
          { label: "Late", value: late, color: "text-amber-600" },
          {
            label: "Attendance Rate",
            value: `${attendanceRate.toFixed(1)}%`,
            color: "text-blue-600",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className={`mt-2 text-2xl font-bold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Student ID</th>
              <th className="p-4">Student</th>
              <th className="p-4">Class</th>
              <th className="p-4">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-4">{student.id}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.grade}</td>
                <td className="p-4 font-medium">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Attendance Rate = (Present + Late) / Total Students × 100.
        Late students are counted as attended in this sample calculation.
      </p>
    </div>
  );
}

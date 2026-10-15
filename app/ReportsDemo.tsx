
"use client";

import { useMemo, useState } from "react";
import {
  Users,
  CalendarCheck,
  Wallet,
  TrendingUp,
  Download,
} from "lucide-react";

type RecordRow = {
  id: string;
  student: string;
  grade: string;
  attendance: "Present" | "Absent" | "Late";
  invoiced: number;
  collected: number;
};

const records: RecordRow[] = [
  { id: "ST-001", student: "Ali Ahmed", grade: "Grade 8", attendance: "Present", invoiced: 12000, collected: 12000 },
  { id: "ST-002", student: "Sara Khan", grade: "Grade 7", attendance: "Present", invoiced: 10000, collected: 10000 },
  { id: "ST-003", student: "Hamza Malik", grade: "Grade 9", attendance: "Absent", invoiced: 15000, collected: 5000 },
  { id: "ST-004", student: "Ayesha Noor", grade: "Grade 6", attendance: "Present", invoiced: 9000, collected: 9000 },
  { id: "ST-005", student: "Bilal Hassan", grade: "Grade 8", attendance: "Late", invoiced: 12000, collected: 0 },
  { id: "ST-006", student: "Fatima Ali", grade: "Grade 9", attendance: "Present", invoiced: 15000, collected: 15000 },
  { id: "ST-007", student: "Zain Abbas", grade: "Grade 7", attendance: "Absent", invoiced: 10000, collected: 4000 },
  { id: "ST-008", student: "Hira Malik", grade: "Grade 6", attendance: "Present", invoiced: 9000, collected: 0 },
];

const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9"];

const money = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;

export default function ReportsDemo() {
  const [grade, setGrade] = useState("All");

  const summary = useMemo(() => {
    const filtered = records.filter(
      (r) => grade === "All" || r.grade === grade
    );

    const count = filtered.length;
    const present = filtered.filter(
      (r) => r.attendance === "Present"
    ).length;
    const late = filtered.filter(
      (r) => r.attendance === "Late"
    ).length;
    const absent = filtered.filter(
      (r) => r.attendance === "Absent"
    ).length;

    const invoiced = filtered.reduce(
      (sum, r) => sum + r.invoiced, 0
    );
    const collected = filtered.reduce(
      (sum, r) => sum + r.collected, 0
    );

    return {
      filtered,
      count,
      present,
      late,
      absent,
      invoiced,
      collected,
      outstanding: invoiced - collected,
      attendanceRate: count ? ((present + late) / count) * 100 : 0,
      collectionRate: invoiced ? (collected / invoiced) * 100 : 0,
    };
  }, [grade]);

  const enrollment = grades.map((g) => ({
    grade: g,
    count: summary.filtered.filter((r) => r.grade === g).length,
  }));

  const exportCSV = () => {
    const headers = [
      "Student ID",
      "Student",
      "Class",
      "Attendance",
      "Invoiced",
      "Collected",
      "Outstanding",
    ];

    const rows = summary.filtered.map((r) => [
      r.id,
      r.student,
      r.grade,
      r.attendance,
      r.invoiced,
      r.collected,
      r.invoiced - r.collected,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SchoolIQ_Demo_Report_${grade.replace(" ", "_")}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const cards = [
    {
      label: "Total Students",
      value: String(summary.count),
      icon: Users,
    },
    {
      label: "Attendance Rate",
      value: `${summary.attendanceRate.toFixed(1)}%`,
      icon: CalendarCheck,
    },
    {
      label: "Fees Collected",
      value: money(summary.collected),
      icon: Wallet,
    },
    {
      label: "Collection Rate",
      value: `${summary.collectionRate.toFixed(1)}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold">Reports & Analytics</h3>
          <p className="mt-1 text-sm text-slate-500">
            Sample student, attendance and financial reporting
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            aria-label="Filter reports by class"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm"
          >
            <option value="All">All Classes</option>
            {grades.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon size={20} className="text-blue-600" />
              </div>
              <p className="mt-3 text-2xl font-bold">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-semibold">Class-wise Enrollment</h3>
          <div className="space-y-5">
            {enrollment.map((item) => (
              <div key={item.grade}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item.grade}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: summary.count
                        ? `${(item.count / summary.count) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-semibold">Attendance Breakdown</h3>
          <div className="space-y-5">
            {[
              { label: "Present", value: summary.present, color: "bg-emerald-500" },
              { label: "Absent", value: summary.absent, color: "bg-red-500" },
              { label: "Late", value: summary.late, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width: summary.count
                        ? `${(item.value / summary.count) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Late students count as attended.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-5 font-semibold">Financial Performance</h3>

        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Total Invoiced</p>
            <p className="mt-1 text-xl font-bold">{money(summary.invoiced)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Collected</p>
            <p className="mt-1 text-xl font-bold text-emerald-600">
              {money(summary.collected)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Outstanding</p>
            <p className="mt-1 text-xl font-bold text-amber-600">
              {money(summary.outstanding)}
            </p>
          </div>
        </div>

        <div
          className="flex h-5 overflow-hidden rounded-full bg-slate-100"
          role="img"
          aria-label={`Collected ${summary.collectionRate.toFixed(1)} percent of invoiced fees`}
        >
          <div
            className="bg-emerald-500"
            style={{ width: `${summary.collectionRate}%` }}
          />
          <div
            className="bg-amber-400"
            style={{ width: `${100 - summary.collectionRate}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Green: Collected | Yellow: Outstanding
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Public read-only portfolio demonstration. All records are fictional.
        Reports and CSV exports use sample data only.
      </p>
    </div>
  );
}


"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  Receipt,
  Clock3,
  Search,
  ShieldCheck,
} from "lucide-react";

type Invoice = {
  id: string;
  student: string;
  grade: string;
  amount: number;
  paid: number;
  dueDate: string;
};

const invoices: Invoice[] = [
  { id: "INV-001", student: "Ali Ahmed", grade: "Grade 8", amount: 12000, paid: 12000, dueDate: "2026-10-10" },
  { id: "INV-002", student: "Sara Khan", grade: "Grade 7", amount: 10000, paid: 10000, dueDate: "2026-10-10" },
  { id: "INV-003", student: "Hamza Malik", grade: "Grade 9", amount: 15000, paid: 5000, dueDate: "2026-10-10" },
  { id: "INV-004", student: "Ayesha Noor", grade: "Grade 6", amount: 9000, paid: 9000, dueDate: "2026-10-10" },
  { id: "INV-005", student: "Bilal Hassan", grade: "Grade 8", amount: 12000, paid: 0, dueDate: "2026-10-10" },
  { id: "INV-006", student: "Fatima Ali", grade: "Grade 9", amount: 15000, paid: 15000, dueDate: "2026-10-10" },
  { id: "INV-007", student: "Zain Abbas", grade: "Grade 7", amount: 10000, paid: 4000, dueDate: "2026-10-10" },
  { id: "INV-008", student: "Hira Malik", grade: "Grade 6", amount: 9000, paid: 0, dueDate: "2026-10-10" },
];

const money = (value: number) =>
  `PKR ${value.toLocaleString("en-PK")}`;

function getStatus(invoice: Invoice) {
  if (invoice.paid >= invoice.amount) return "Paid";
  if (invoice.paid === 0) return "Unpaid";
  return "Partial";
}

export default function FeesDemo() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.student.toLowerCase().includes(search.trim().toLowerCase()) ||
        invoice.id.toLowerCase().includes(search.trim().toLowerCase());

      const matchesGrade = grade === "All" || invoice.grade === grade;
      const matchesStatus =
        status === "All" || getStatus(invoice) === status;

      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [search, grade, status]);

  const totalInvoiced = filtered.reduce(
    (sum, invoice) => sum + invoice.amount, 0
  );

  const totalCollected = filtered.reduce(
    (sum, invoice) => sum + invoice.paid, 0
  );

  const outstanding = totalInvoiced - totalCollected;

  const collectionRate = totalInvoiced
    ? (totalCollected / totalInvoiced) * 100
    : 0;

  const cards = [
    { label: "Total Invoiced", value: money(totalInvoiced), icon: Receipt },
    { label: "Fees Collected", value: money(totalCollected), icon: Wallet },
    { label: "Outstanding Fees", value: money(outstanding), icon: Clock3 },
    { label: "Collection Rate", value: `${collectionRate.toFixed(1)}%`, icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Fee Management Overview</h3>
        <p className="mt-1 text-sm text-slate-500">
          Interactive invoice records using fictional data.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="search"
              aria-label="Search invoices"
              placeholder="Search student or invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm"
            />
          </div>

          <select
            aria-label="Filter by class"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="All">All Classes</option>
            {["Grade 6", "Grade 7", "Grade 8", "Grade 9"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            aria-label="Filter by payment status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon size={20} className="text-blue-600" />
              </div>
              <p className="mt-3 text-xl font-bold">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 p-5">
          <h3 className="font-semibold">Student Fee Invoices</h3>
          <span className="text-sm text-slate-500">
            Showing {filtered.length} of {invoices.length} invoices
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4">Invoice</th>
                <th className="p-4">Student</th>
                <th className="p-4">Class</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Outstanding</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((invoice) => {
                const paymentStatus = getStatus(invoice);
                return (
                  <tr key={invoice.id} className="border-t border-slate-100">
                    <td className="p-4 font-medium">{invoice.id}</td>
                    <td className="p-4">{invoice.student}</td>
                    <td className="p-4">{invoice.grade}</td>
                    <td className="p-4">{money(invoice.amount)}</td>
                    <td className="p-4">{money(invoice.paid)}</td>
                    <td className="p-4">
                      {money(invoice.amount - invoice.paid)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          paymentStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : paymentStatus === "Partial"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="p-10 text-center text-slate-500">
              No matching invoices found.
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Read-only demonstration. All financial records are fictional.
        Summary KPIs reflect the currently filtered invoices.
        No payment processing or database updates are performed.
      </p>
    </div>
  );
}

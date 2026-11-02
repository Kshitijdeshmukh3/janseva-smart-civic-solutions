import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { BarChart3, TrendingUp, CheckCircle2, Clock, ShieldCheck, IndianRupee } from 'lucide-react';

const categoryData = [
  { name: 'Streetlights', count: 4210, resolved: 3950 },
  { name: 'Roads & Potholes', count: 3540, resolved: 3120 },
  { name: 'Water Supply', count: 2890, resolved: 2710 },
  { name: 'Solid Waste', count: 2150, resolved: 2010 },
  { name: 'Drainage', count: 1420, resolved: 1210 },
  { name: 'Public Parks', count: 610, resolved: 410 },
];

const priorityData = [
  { name: 'P0 Critical', value: 480, color: '#ef4444' },
  { name: 'P1 Highest', value: 1850, color: '#f97316' },
  { name: 'P2 High', value: 5420, color: '#f59e0b' },
  { name: 'P3 Medium', value: 4950, color: '#3b82f6' },
  { name: 'P4 Low', value: 2120, color: '#64748b' },
];

const monthlyTrend = [
  { month: 'Jun', filed: 1200, resolved: 1050 },
  { month: 'Jul', filed: 1850, resolved: 1600 },
  { month: 'Aug', filed: 2100, resolved: 1950 },
  { month: 'Sep', filed: 1900, resolved: 1780 },
  { month: 'Oct', filed: 1650, resolved: 1590 },
  { month: 'Nov', filed: 720, resolved: 680 },
];

export default function PublicTransparencyDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
            Municipal Open Data & Transparency
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Public Civic Performance Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time verified civic indicators, resolution timelines, and municipal fund accountability under RTI and Open Governance norms.
          </p>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total Grievances Processed</span>
            <span className="text-3xl font-black text-white">14,820</span>
            <span className="text-xs text-emerald-400 font-semibold block mt-1">↑ 12% from last quarter</span>
          </div>

          <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Average Resolution Time</span>
            <span className="text-3xl font-black text-blue-400">28.4h</span>
            <span className="text-xs text-emerald-400 font-semibold block mt-1">Within 36h statutory SLA</span>
          </div>

          <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Overall SLA Compliance</span>
            <span className="text-3xl font-black text-emerald-400">92.8%</span>
            <span className="text-xs text-slate-400 block mt-1">Calculated across 5 wards</span>
          </div>

          <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Citizen Satisfaction Score</span>
            <span className="text-3xl font-black text-amber-400">4.6 / 5.0</span>
            <span className="text-xs text-slate-400 block mt-1">From 8,400+ verified ratings</span>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <div className="bg-slate-850 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Grievances by Category (Filed vs. Resolved)
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Departmental breakdown of incoming citizen complaints
            </p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" name="Filed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-slate-850 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Monthly Resolution Velocity Trend
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Tracking municipal turnaround rate over time
            </p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="filed" name="Complaints Filed" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="resolved" name="Complaints Resolved" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2: Priority Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-850 p-6 rounded-3xl border border-slate-800 shadow-xl lg:col-span-1">
            <h3 className="text-base font-bold text-white mb-1">
              Priority Engine Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Breakdown by automated severity (P0-P4)
            </p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 text-xs">
              {priorityData.map(p => (
                <div key={p.name} className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                    {p.name}
                  </span>
                  <span className="font-mono font-bold text-white">{p.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ward Health League Table */}
          <div className="bg-slate-850 p-6 rounded-3xl border border-slate-800 shadow-xl lg:col-span-2">
            <h3 className="text-base font-bold text-white mb-1">
              Ward Performance & Development Score
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Empirical scoring based on SLA adherence, infrastructure condition, and citizen feedback
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Ward Name</th>
                    <th className="py-3 px-4">Representative</th>
                    <th className="py-3 px-4">Resolution %</th>
                    <th className="py-3 px-4">Avg SLA Hours</th>
                    <th className="py-3 px-4 rounded-r-xl">Ward Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-bold text-white">Ward 14 (Kothrud North)</td>
                    <td className="py-3.5 px-4">Smt. Sunita More</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">94.2%</td>
                    <td className="py-3.5 px-4 font-mono">22.1h</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                        9.4 / 10
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-bold text-white">Ward 18 (Bavdhan - Pashan)</td>
                    <td className="py-3.5 px-4">Shri Nitin Kadam</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">91.8%</td>
                    <td className="py-3.5 px-4 font-mono">26.5h</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                        9.1 / 10
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-bold text-white">Ward 22 (Aundh Central)</td>
                    <td className="py-3.5 px-4">Dr. Archana Shinde</td>
                    <td className="py-3.5 px-4 text-blue-400 font-semibold">89.4%</td>
                    <td className="py-3.5 px-4 font-mono">31.2h</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-blue-500/10 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-500/20">
                        8.8 / 10
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-bold text-white">Ward 10 (Shivajinagar)</td>
                    <td className="py-3.5 px-4">Shri Mahesh Joshi</td>
                    <td className="py-3.5 px-4 text-amber-400 font-semibold">86.2%</td>
                    <td className="py-3.5 px-4 font-mono">34.0h</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/20">
                        8.5 / 10
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

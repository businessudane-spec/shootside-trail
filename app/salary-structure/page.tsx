import { Metadata } from 'next';
import Link from 'next/link';
import { PMSalaryGuide } from '@/components/pm/PMSalaryGuide';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Role & Salary Compensation Structure | ShootSide',
  description: 'Official title-based salary matrix and compensation reference for ShootSide team members and employees.',
};

export default function SalaryStructurePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/project-management"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to ShootSide Workspace</span>
          </Link>

          <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>ShootSide Employee Reference Document</span>
          </div>
        </div>

        {/* The Salary Compensation Guide Component */}
        <PMSalaryGuide />
      </div>
    </div>
  );
}

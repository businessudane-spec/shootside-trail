'use client';

import React, { useState, useMemo } from 'react';
import {
  BadgeIndianRupee,
  Search,
  Filter,
  Briefcase,
  Layers,
  ArrowUpDown,
  Download,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  Table as TableIcon,
  HelpCircle,
  ShieldCheck,
  Building2,
  Users,
  FileText,
  Eye,
  ExternalLink,
  X,
  FileSpreadsheet,
  Copy
} from 'lucide-react';

export interface SalaryRole {
  id: string;
  title: string;
  level: 'Senior' | 'Mid-Level' | 'Junior' | 'Standard';
  department: string;
  rate: number;
  rateFormatted: string;
  scope: string;
  tags: string[];
}

export const SALARY_DATA: SalaryRole[] = [
  {
    id: 'scriptwriter-sr',
    title: 'Scriptwriter',
    level: 'Senior',
    department: 'Content & Screenwriting',
    rate: 3500,
    rateFormatted: '₹3,500',
    scope: 'Lead narrative drafting, dialogue polish, treatment conceptualization and script supervision.',
    tags: ['Scripts', 'Storytelling', 'Direction Sync']
  },
  {
    id: 'creative-director-sr',
    title: 'Creative Director',
    level: 'Senior',
    department: 'Direction & Concept',
    rate: 3500,
    rateFormatted: '₹3,500',
    scope: 'Creative vision alignment, storyboard approvals, production aesthetics, and campaign theme governance.',
    tags: ['Vision', 'Brand Aesthetics', 'Executive']
  },
  {
    id: 'web-dev-sr',
    title: 'Website Developer',
    level: 'Senior',
    department: 'Web & Engineering',
    rate: 3500,
    rateFormatted: '₹3,500',
    scope: 'Full-stack architecture, CMS integrations, custom portal builds, and web performance optimization.',
    tags: ['Full-stack', 'Next.js', 'WordPress', 'APIs']
  },
  {
    id: 'video-editor-sr',
    title: 'Video Editor',
    level: 'Senior',
    department: 'Post Production',
    rate: 3000,
    rateFormatted: '₹3,500', // Note: User specified 3,000
    scope: 'Multi-cam assembly, color grading, pacing, sound design mastering, and finalized deliverable exports.',
    tags: ['Premiere Pro', 'DaVinci', 'Sound Design']
  },
  {
    id: 'it-support-sr',
    title: 'IT Support',
    level: 'Senior',
    department: 'Tech & Infrastructure',
    rate: 3000,
    rateFormatted: '₹3,000',
    scope: 'Network administration, workstation reliability, cloud credential stores, and backup sanity checks.',
    tags: ['Systems', 'Security', 'Cloud']
  },
  {
    id: 'poster-designer-creative-sr',
    title: 'Poster Designer Creative',
    level: 'Senior',
    department: 'Design & Graphics',
    rate: 2500,
    rateFormatted: '₹2,500',
    scope: 'High-impact key art composition, title typography, promotional billboards, and hero artwork.',
    tags: ['Key Visuals', 'Photoshop', 'Typography']
  },
  {
    id: 'cameraman-videographer',
    title: 'Cameraman / Videographer',
    level: 'Standard',
    department: 'Cinematography & Shoot',
    rate: 2200,
    rateFormatted: '₹2,200',
    scope: 'On-set camera operation, framing, gimbal execution, lighting setup, and raw footage intake.',
    tags: ['Camera Gear', 'Lighting', 'On-Set']
  },
  {
    id: 'actor-standard',
    title: 'Actor',
    level: 'Standard',
    department: 'Cast & Performance',
    rate: 2000,
    rateFormatted: '₹2,000',
    scope: 'Principal screen appearance, dialogue delivery, character portrayal, and shoot schedule calls.',
    tags: ['Screen Cast', 'Dialogue', 'On-Camera']
  },
  {
    id: 'poster-designer-mid',
    title: 'Poster Designer',
    level: 'Mid-Level',
    department: 'Design & Graphics',
    rate: 2000,
    rateFormatted: '₹2,000',
    scope: 'Social banners, thumbnail variations, release graphics, and typography layout execution.',
    tags: ['Thumbnails', 'Banners', 'Illustrator']
  },
  {
    id: 'video-editor-jr',
    title: 'Video Editor',
    level: 'Junior',
    department: 'Post Production',
    rate: 2000,
    rateFormatted: '₹2,000',
    scope: 'Rough cuts, sync audio, timeline preparation, social reels, and initial version delivery.',
    tags: ['Reels', 'Rough Cuts', 'Syncing']
  },
  {
    id: 'meta-ads-sr',
    title: 'Meta Ads Manager',
    level: 'Senior',
    department: 'Performance Marketing',
    rate: 2000,
    rateFormatted: '₹2,000',
    scope: 'Media budget allocation, audience testing, ROAS scaling, pixel setups, and conversion reporting.',
    tags: ['Meta Ads', 'Targeting', 'ROAS']
  },
  {
    id: 'actor-jr',
    title: 'Actor',
    level: 'Junior',
    department: 'Cast & Performance',
    rate: 1500,
    rateFormatted: '₹1,500',
    scope: 'Supporting role, background cues, secondary scenes, and promotional reel features.',
    tags: ['Supporting Cast', 'Scenes']
  },
  {
    id: 'meta-ads-jr',
    title: 'Meta Ads Manager',
    level: 'Junior',
    department: 'Performance Marketing',
    rate: 1500,
    rateFormatted: '₹1,500',
    scope: 'Creative upload, A/B ad variation setup, daily spend sanity checks, and dashboard metrics pulling.',
    tags: ['Ad Operations', 'A/B Testing']
  },
  {
    id: 'ai-video-creator',
    title: 'AI Video Creator',
    level: 'Standard',
    department: 'AI & Innovation',
    rate: 1500,
    rateFormatted: '₹1,500',
    scope: 'Generative video prompting, synthetic voice synthesis, avatar animation, and experimental clips.',
    tags: ['Gen-AI', 'Runway', 'Midjourney', 'Voiceover']
  },
  {
    id: 'poster-designer-jr',
    title: 'Poster Designer',
    level: 'Junior',
    department: 'Design & Graphics',
    rate: 1200,
    rateFormatted: '₹1,200',
    scope: 'Format resizing, asset export, story adaptation banners, and template graphics updates.',
    tags: ['Resizing', 'Exporting', 'Social Ads']
  },
  {
    id: 'smm-sr',
    title: 'Social Media Manager',
    level: 'Senior',
    department: 'Social & Marketing',
    rate: 1200,
    rateFormatted: '₹1,200',
    scope: 'Publishing calendar oversight, channel brand tone, viral formats, and engagement growth strategies.',
    tags: ['Content Strategy', 'Growth', 'Community']
  },
  {
    id: 'web-dev-jr',
    title: 'Website Developer',
    level: 'Junior',
    department: 'Web & Engineering',
    rate: 1000,
    rateFormatted: '₹1,000',
    scope: 'Content updates, responsive HTML/CSS tweaks, bug fixes, and static landing page assists.',
    tags: ['HTML/CSS', 'Frontend', 'Bug Fixes']
  },
  {
    id: 'smm-standard',
    title: 'Social Media Manager',
    level: 'Standard',
    department: 'Social & Marketing',
    rate: 1000,
    rateFormatted: '₹1,000',
    scope: 'Scheduled posting, caption publishing, community inbox queries, and metric tracking.',
    tags: ['Scheduling', 'Captions', 'Posting']
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    level: 'Standard',
    department: 'Design & Product',
    rate: 500,
    rateFormatted: '₹500',
    scope: 'Interface wireframing, component mockups, UX flow audits, and developer handoff notes.',
    tags: ['Figma', 'Wireframes', 'UX Flow']
  }
];

export const PMSalaryGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState<'rate-desc' | 'rate-asc' | 'title-asc'>('rate-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [copiedSheet, setCopiedSheet] = useState(false);

  // Fix video editor senior rate display
  const sanitizedData = useMemo(() => {
    return SALARY_DATA.map(item => {
      if (item.id === 'video-editor-sr') {
        return { ...item, rateFormatted: '₹3,000' };
      }
      return item;
    });
  }, []);

  const departments = useMemo(() => {
    const deps = Array.from(new Set(sanitizedData.map(d => d.department)));
    return ['All', ...deps];
  }, [sanitizedData]);

  const levels = ['All', 'Senior', 'Mid-Level', 'Junior', 'Standard'];

  const filteredRoles = useMemo(() => {
    return sanitizedData
      .filter(item => {
        if (selectedDepartment !== 'All' && item.department !== selectedDepartment) {
          return false;
        }
        if (selectedLevel !== 'All') {
          if (selectedLevel === 'Standard' && item.level !== 'Standard') return false;
          if (selectedLevel !== 'Standard' && item.level !== selectedLevel) return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDept = item.department.toLowerCase().includes(q);
          const matchLevel = item.level.toLowerCase().includes(q);
          const matchRate = item.rateFormatted.includes(q) || String(item.rate).includes(q);
          const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchDept || matchLevel || matchRate || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rate-desc') return b.rate - a.rate;
        if (sortBy === 'rate-asc') return a.rate - b.rate;
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [sanitizedData, selectedDepartment, selectedLevel, searchQuery, sortBy]);

  const stats = useMemo(() => {
    const total = sanitizedData.length;
    const max = Math.max(...sanitizedData.map(d => d.rate));
    const min = Math.min(...sanitizedData.map(d => d.rate));
    const avg = Math.round(sanitizedData.reduce((acc, curr) => acc + curr.rate, 0) / total);
    return { total, max, min, avg };
  }, [sanitizedData]);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Senior':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Mid-Level':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Junior':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['#', 'Role Title', 'Seniority Level', 'Department', 'Scope / Responsibilities', 'Rate (INR)'];
    const rows = filteredRoles.map((r, i) => [
      i + 1,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.level}"`,
      `"${r.department}"`,
      `"${r.scope.replace(/"/g, '""')}"`,
      r.rate
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ShootSide-Salary-Sheet.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySheet = () => {
    const headers = ['#', 'Role Title', 'Seniority Level', 'Department', 'Compensation Rate (INR)'];
    const rows = filteredRoles.map((r, i) => [
      i + 1,
      r.title,
      r.level,
      r.department,
      `₹${r.rate.toLocaleString()}`
    ]);
    const tsvContent = [headers.join('\t'), ...rows.map(e => e.join('\t'))].join('\n');
    navigator.clipboard.writeText(tsvContent);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-6 md:p-8 text-white shadow-lg shadow-emerald-500/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-100 text-xs font-semibold mb-2 tracking-wide">
              <BadgeIndianRupee className="w-4 h-4 text-emerald-200" />
              <span>SHOOTSIDE INTERNAL POLICIES</span>
              <span>•</span>
              <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                OFFICIAL RATE CARD
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Role & Salary Compensation Guide
            </h1>
            <p className="text-xs md:text-sm text-emerald-100 mt-1.5 max-w-2xl leading-relaxed">
              Standardized compensation matrix categorized by title and seniority level. Provided as a transparent benchmark for internal allocations and team members.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center space-x-1.5 cursor-pointer backdrop-blur-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Partner Salary and Work Policy Banner Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200/60 dark:border-rose-900/40">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                OFFICIAL POLICY PDF
              </span>
              <span className="text-xs text-slate-400 font-medium">Partner-Salary-and-Work-Policy-Final.pdf</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
              Partner Salary and Work Policy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Official reference document detailing partner compensation, engagement policies, deliverable cycles, and workplace guidelines.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={() => setShowPdfModal(true)}
            className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Policy PDF</span>
          </button>
          <a
            href="/Partner-Salary-and-Work-Policy-Final.pdf"
            download="Partner-Salary-and-Work-Policy-Final.pdf"
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Roles Cataloged</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{stats.total}</span>
            <span className="text-xs text-slate-400 font-medium">defined positions</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">
            Across {departments.length - 1} operational disciplines
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Top Senior Scale</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">₹{stats.max.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium">per deliverable/cycle</span>
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-2 font-semibold">
            Senior Scriptwriter, Creative Director, Web Dev
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Average Compensation</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">₹{stats.avg.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium">team median</span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-2 font-semibold">
            Balanced across technical and creative sets
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Base Standard Scale</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">₹{stats.min.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium">starting minimum</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 font-semibold">
            UI/UX Designer & Entry Trainee positions
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Sorters & View Switcher */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, level, or skill (e.g. Actor, Senior, Designer)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Seniority Level */}
            <div className="flex items-center space-x-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {levels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Sorter */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="rate-desc">Pay: High to Low</option>
              <option value="rate-asc">Pay: Low to High</option>
              <option value="title-asc">Role Title (A-Z)</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Compact Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Department Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Department:</span>
          </span>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedDepartment === dept
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Result Count and Filters Reset Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredRoles.length}</strong> of {sanitizedData.length} role designations
        </span>

        {(searchQuery || selectedDepartment !== 'All' || selectedLevel !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDepartment('All');
              setSelectedLevel('All');
            }}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Main Content: Grid View or Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map(role => (
            <div
              key={role.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/80 hover:shadow-md transition-all group flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div>
                {/* Header: Department + Level badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate max-w-[160px]">
                    {role.department}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getLevelBadge(role.level)}`}>
                    {role.level === 'Standard' ? 'General' : role.level}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {role.title}
                </h3>

                {/* Description Scope */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {role.scope}
                </p>
              </div>

              <div>
                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 mb-3">
                  {role.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Pay Box */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Standard Rate
                  </div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {role.rateFormatted}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Spreadsheet Row Sheet View */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
          {/* Spreadsheet Header Toolbar */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                ShootSide Master Salary Compensation Sheet ({filteredRoles.length} Rows)
              </span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={handleCopySheet}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                title="Copy entire sheet rows to paste into Google Sheets / Excel"
              >
                {copiedSheet ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied Sheet!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy for Excel / Sheets</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
                title="Download as .csv spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Sheet</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
              <thead className="bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3.5 text-center w-12 border-r border-slate-200 dark:border-slate-700">#</th>
                  <th className="py-3 px-4 border-r border-slate-200 dark:border-slate-700">Role Title</th>
                  <th className="py-3 px-3.5 border-r border-slate-200 dark:border-slate-700">Seniority Level</th>
                  <th className="py-3 px-4 border-r border-slate-200 dark:border-slate-700">Department</th>
                  <th className="py-3 px-4 border-r border-slate-200 dark:border-slate-700">Scope & Responsibilities</th>
                  <th className="py-3 px-4 text-right">Standard Rate (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800 font-medium">
                {filteredRoles.map((role, idx) => (
                  <tr
                    key={role.id}
                    className={`hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors ${
                      idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-850/30' : 'bg-white dark:bg-slate-900'
                    }`}
                  >
                    <td className="py-3.5 px-3.5 text-center text-slate-400 dark:text-slate-500 font-mono text-[11px] font-bold border-r border-slate-200/70 dark:border-slate-800">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200/70 dark:border-slate-800">
                      <div className="flex items-center space-x-2">
                        <span>{role.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3.5 border-r border-slate-200/70 dark:border-slate-800">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getLevelBadge(role.level)}`}>
                        {role.level === 'Standard' ? 'General' : role.level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 border-r border-slate-200/70 dark:border-slate-800 font-medium">
                      {role.department}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 text-[11px] max-w-md border-r border-slate-200/70 dark:border-slate-800">
                      {role.scope}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm whitespace-nowrap">
                      {role.rateFormatted}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 dark:bg-slate-800/90 font-bold border-t-2 border-slate-300 dark:border-slate-700 text-xs">
                <tr>
                  <td colSpan={2} className="py-3 px-4 text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700">
                    Total: {filteredRoles.length} Roles Cataloged
                  </td>
                  <td colSpan={2} className="py-3 px-4 text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 text-[11px]">
                    Average Rate: ₹{Math.round(filteredRoles.reduce((acc, curr) => acc + curr.rate, 0) / (filteredRoles.length || 1)).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-right text-[11px] border-r border-slate-200 dark:border-slate-700">
                    Sum Total:
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                    ₹{filteredRoles.reduce((acc, curr) => acc + curr.rate, 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Guidelines & Policy Footer */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-500 dark:text-slate-400 shadow-2xs">
        <div className="flex items-center space-x-2 font-bold text-slate-800 dark:text-slate-200">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Compensation Policy & Review Notes</span>
        </div>
        <p className="leading-relaxed">
          • All listed figures correspond to standardized rates per assigned shoot/deliverable cycle as authorized by ShootSide Management.
        </p>
        <p className="leading-relaxed">
          • Senior tiers are designated based on technical mastery, independent execution, and project leadership. Junior tiers include structured oversight.
        </p>
        <p className="leading-relaxed">
          • For customized deliverable milestones, multi-role executions, or cross-departmental requirements, consult directly with your Lead Project Manager or ShootSide Administration.
        </p>
      </div>

      {/* PDF Modal Viewer */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Partner-Salary-and-Work-Policy-Final.pdf
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Official ShootSide Policy Reference</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="/Partner-Salary-and-Work-Policy-Final.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center space-x-1"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href="/Partner-Salary-and-Work-Policy-Final.pdf"
                  download="Partner-Salary-and-Work-Policy-Final.pdf"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer ml-1"
                  title="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 p-2">
              <iframe
                src="/Partner-Salary-and-Work-Policy-Final.pdf#toolbar=1"
                className="w-full h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white"
                title="Partner Salary and Work Policy PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

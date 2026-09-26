'use client';

import React, { useState } from 'react';
import { PMAuthProvider } from '@/lib/pm-auth-context';
import { PMDataProvider, usePMData } from '@/lib/pm-data-context';
import { PMThemeProvider } from '@/lib/pm-theme-context';
import { PMSidebar, PMView } from '@/components/pm/PMSidebar';
import { PMHeader } from '@/components/pm/PMHeader';
import { PMDashboard } from '@/components/pm/PMDashboard';
import { PMProjectsList } from '@/components/pm/PMProjectsList';
import { PMProjectDetail } from '@/components/pm/PMProjectDetail';
import { PMTasksList } from '@/components/pm/PMTasksList';
import { PMKanbanBoard } from '@/components/pm/PMKanbanBoard';
import { PMCalendarView } from '@/components/pm/PMCalendarView';
import { PMTeamView } from '@/components/pm/PMTeamView';
import { PMVaultView } from '@/components/pm/PMVaultView';
import { PMNotificationsView } from '@/components/pm/PMNotificationsView';
import { PMReports } from '@/components/pm/PMReports';
import { PMActivityLog } from '@/components/pm/PMActivityLog';
import { PMDeletedItems } from '@/components/pm/PMDeletedItems';
import { PMCreateTaskModal } from '@/components/pm/PMCreateTaskModal';
import { PMCreateProjectModal } from '@/components/pm/PMCreateProjectModal';
import { PMTaskDetailDrawer } from '@/components/pm/PMTaskDetailDrawer';
import { PMLoginModal } from '@/components/pm/PMLoginModal';
import { PMProfileModal } from '@/components/pm/PMProfileModal';
import { PMLoginScreen } from '@/components/pm/PMLoginScreen';
import { usePMAuth } from '@/lib/pm-auth-context';
import { PMTask, PMProject } from '@/lib/pm-types';

function PMAppContent() {
  const { user, isLoading } = usePMAuth();
  const [currentView, setCurrentView] = useState<PMView>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Modals & Drawers state
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { selectedTask, setSelectedTask, selectedProject, setSelectedProject } = usePMData();

  const handleSelectProject = (project: PMProject) => {
    setSelectedProject(project);
    setCurrentView('projects');
  };

  const handleSelectTask = (task: PMTask) => {
    setSelectedTask(task);
  };

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Loading ShootSide Workspace...</p>
        </div>
      </div>
    );
  }

  // Not logged in -> Show secure Login Screen
  if (!user) {
    return <PMLoginScreen />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <div className="flex flex-1">
        {/* Collapsible Hamburger Sidebar */}
        <PMSidebar
          currentView={currentView}
          setCurrentView={(v) => {
            setSelectedProject(null);
            setCurrentView(v);
          }}
          openCreateTask={() => setIsCreateTaskOpen(true)}
          openCreateProject={() => setIsCreateProjectOpen(true)}
          openProfileModal={() => setIsProfileModalOpen(true)}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Mobile Backdrop */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs md:hidden"
          />
        )}

        {/* Main Workspace Area with Dynamic Breakdown Margin */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            isCollapsed ? 'md:pl-20' : 'md:pl-64'
          }`}
        >
          {/* Top Header */}
          <PMHeader
            onToggleSidebar={toggleSidebar}
            openLoginModal={() => setIsLoginModalOpen(true)}
            openProfileModal={() => setIsProfileModalOpen(true)}
          />

          {/* Main Dashboard / View Container */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            {selectedProject ? (
              <PMProjectDetail
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
                onSelectTask={handleSelectTask}
                openCreateTask={() => setIsCreateTaskOpen(true)}
              />
            ) : (
              <>
                {currentView === 'dashboard' && (
                  <PMDashboard
                    onSelectProject={handleSelectProject}
                    onSelectTask={handleSelectTask}
                    openCreateTask={() => setIsCreateTaskOpen(true)}
                    openCreateProject={() => setIsCreateProjectOpen(true)}
                    onNavigateView={setCurrentView}
                  />
                )}

                {currentView === 'projects' && (
                  <PMProjectsList
                    onSelectProject={handleSelectProject}
                    openCreateProject={() => setIsCreateProjectOpen(true)}
                  />
                )}

                {currentView === 'tasks_list' && (
                  <PMTasksList
                    onSelectTask={handleSelectTask}
                    openCreateTask={() => setIsCreateTaskOpen(true)}
                  />
                )}

                {currentView === 'tasks_my' && (
                  <PMTasksList
                    filterMyTasksOnly={true}
                    onSelectTask={handleSelectTask}
                    openCreateTask={() => setIsCreateTaskOpen(true)}
                  />
                )}

                {currentView === 'tasks_kanban' && (
                  <PMKanbanBoard
                    onSelectTask={handleSelectTask}
                    openCreateTask={() => setIsCreateTaskOpen(true)}
                  />
                )}

                {currentView === 'calendar' && (
                  <PMCalendarView
                    onSelectTask={handleSelectTask}
                    openCreateTask={() => setIsCreateTaskOpen(true)}
                  />
                )}

                {currentView === 'team' && <PMTeamView />}

                {currentView === 'vault' && <PMVaultView />}

                {currentView === 'notifications' && <PMNotificationsView onSelectTask={handleSelectTask} />}

                {currentView === 'reports' && <PMReports />}

                {currentView === 'admin_activity' && <PMActivityLog />}

                {currentView === 'admin_trash' && <PMDeletedItems />}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Modals & Drawers */}
      <PMCreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        defaultProjectId={selectedProject?.id}
      />

      <PMCreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />

      <PMLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <PMProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {selectedTask && (
        <PMTaskDetailDrawer
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default function PMPage() {
  return (
    <PMThemeProvider>
      <PMAuthProvider>
        <PMDataProvider>
          <PMAppContent />
        </PMDataProvider>
      </PMAuthProvider>
    </PMThemeProvider>
  );
}

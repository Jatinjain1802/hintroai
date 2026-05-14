import {
  LuPlus,
  LuUsers,
  LuClock,
  LuZap,
  LuCalendar
} from 'react-icons/lu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import { formatAvgDuration, getLastSession } from '../../utils/formatters';
import { useUser } from '../../context/UserContext';
import { TbChartPie2Filled } from "react-icons/tb";
import { HiSparkles, HiCalendarDays } from "react-icons/hi2";
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import StatsCard from '../../components/StatsCard/StatsCard';
import RecentCalls from '../../components/RecentCalls/RecentCalls';
import EmptyState from '../../components/EmptyState/EmptyState';
import LogoutModal from '../../components/LogoutModal/LogoutModal';

import styles from './Dashboard.module.css';

function Dashboard() {
  const { userId } = useUser();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { profile, stats, calls, loading, error } = useDashboard(userId);

  function handleLogoutClick() {
    setSidebarOpen(false);
    setLogoutOpen(true);
  }

  function handleLogoutCancel() {
    setLogoutOpen(false);
  }

  function handleLogoutConfirm() {
    setLogoutOpen(false);
    navigate('/login');
  }

  const totalSessions = stats?.totalSessions ?? 0;
  const avgDuration = formatAvgDuration(stats?.averageDuration);
  const aiInteractions = stats?.totalAIInteractions ?? 0;
  const lastSession = getLastSession(stats?.lastSession ?? []);
  const userName = profile?.firstName ?? 'there';

  if (error) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorBox}>
          <span className={styles.errorIcon}>⚠️</span>
          <h2>Failed to load dashboard</h2>
          <p>{error}</p>
          <button className={styles.retryBtn} onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={styles.main}>
        <Header 
          title="Dashboard" 
          onLogout={handleLogoutClick} 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <div className={styles.content}>
          {/* Welcome Section */}
          <section className={styles.welcomeSection}>
            <div className={styles.welcomeText}>
              <h2 className={styles.greeting}>Hi, {userName} 👋 Welcome to Hintro</h2>
              <p className={styles.subGreeting}>Ready to make your next call smarter ?</p>
            </div>
            <button className={styles.startCallBtn}>
              <LuPlus size={20} strokeWidth={3} />
              <span>Start New Call</span>
            </button>
          </section>

          {/* Stats Cards Grid */}
          <section className={styles.statsGrid}>
            <StatsCard
              title="Total Sessions"
              value={totalSessions}
              icon={<TbChartPie2Filled size={24} color="#F04438" />}
              color="#FEE4E2"
              loading={loading}
            />
            <StatsCard
              title="Average Duration"
              value={avgDuration}
              icon={<LuClock size={24} color="#0EA5E9" />}
              color="#E0F2FE"
              loading={loading}
            />
            <StatsCard
              title="AI Used"
              value={`${aiInteractions} times`}
              icon={<HiSparkles size={24} color="#10B981" fill="#10B981" />}
              color="#D1FAE5"
              loading={loading}
            />
            <StatsCard
              title="Last Session"
              value={lastSession}
              icon={<HiCalendarDays size={24} color="#8B5CF6" />}
              color="#F5F3FF"
              loading={loading}
            />
          </section>

          {/* Recent Calls Section */}
          <section className={styles.recentCallsSection}>
            <h3 className={styles.sectionTitle}>Recent calls</h3>
            {!loading && calls.length === 0
              ? <EmptyState />
              : <RecentCalls calls={calls} loading={loading} />
            }
          </section>
        </div>
      </main>

      <LogoutModal
        isOpen={logoutOpen}
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default Dashboard;

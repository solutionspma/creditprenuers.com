import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

// Dummy data for demo
const DUMMY_STATS = {
  activeLoads: 2,
  completedToday: 3,
  earnings: 1250.00,
  milesThisWeek: 847,
  rating: 4.9,
  onTimePercentage: 98,
};

const DUMMY_UPCOMING_JOBS = [
  {
    id: 'JOB-001',
    pickup: 'Chicago, IL',
    delivery: 'Detroit, MI',
    distance: '282 mi',
    rate: '$650',
    pickupTime: '2:00 PM Today',
    status: 'ready',
  },
  {
    id: 'JOB-002',
    pickup: 'Detroit, MI',
    delivery: 'Cleveland, OH',
    distance: '171 mi',
    rate: '$420',
    pickupTime: '9:00 AM Tomorrow',
    status: 'scheduled',
  },
];

export default function Dashboard({ navigation }) {
  const { user } = useAuth();
  const [stats, setStats] = useState(DUMMY_STATS);
  const [jobs, setJobs] = useState(DUMMY_UPCOMING_JOBS);
  const [refreshing, setRefreshing] = useState(false);

  async function loadDashboard() {
    try {
      // In production, fetch real data
      // const data = await api.getDashboard();
      // setStats(data.stats);
      // setJobs(data.upcomingJobs);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function StatCard({ icon, label, value, color }) {
    return (
      <View style={[styles.statCard, { borderLeftColor: color }]}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    );
  }

  function JobCard({ job }) {
    return (
      <TouchableOpacity 
        style={styles.jobCard}
        onPress={() => navigation.navigate('JobDetails', { jobId: job.id })}
      >
        <View style={styles.jobHeader}>
          <Text style={styles.jobId}>{job.id}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: job.status === 'ready' ? '#16A34A' : '#3B82F6' }
          ]}>
            <Text style={styles.statusText}>
              {job.status === 'ready' ? 'Ready' : 'Scheduled'}
            </Text>
          </View>
        </View>
        
        <View style={styles.routeInfo}>
          <View style={styles.routePoint}>
            <Text style={styles.routeIcon}>📍</Text>
            <View>
              <Text style={styles.routeLabel}>Pickup</Text>
              <Text style={styles.routeCity}>{job.pickup}</Text>
            </View>
          </View>
          <Text style={styles.routeArrow}>→</Text>
          <View style={styles.routePoint}>
            <Text style={styles.routeIcon}>🏁</Text>
            <View>
              <Text style={styles.routeLabel}>Delivery</Text>
              <Text style={styles.routeCity}>{job.delivery}</Text>
            </View>
          </View>
        </View>

        <View style={styles.jobFooter}>
          <Text style={styles.jobMeta}>🚚 {job.distance}</Text>
          <Text style={styles.jobMeta}>⏰ {job.pickupTime}</Text>
          <Text style={styles.jobRate}>{job.rate}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#16A34A']} />
      }
    >
      {/* Welcome Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.driverName}>{user?.name || 'Driver'} 👋</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard 
          icon="📦" 
          label="Active Loads" 
          value={stats.activeLoads}
          color="#16A34A"
        />
        <StatCard 
          icon="✅" 
          label="Completed Today" 
          value={stats.completedToday}
          color="#3B82F6"
        />
        <StatCard 
          icon="💵" 
          label="Today's Earnings" 
          value={`$${stats.earnings.toFixed(0)}`}
          color="#F59E0B"
        />
        <StatCard 
          icon="🛣️" 
          label="Miles This Week" 
          value={stats.milesThisWeek}
          color="#8B5CF6"
        />
      </View>

      {/* Performance */}
      <View style={styles.performanceCard}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.performanceRow}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>⭐ {stats.rating}</Text>
            <Text style={styles.performanceLabel}>Driver Rating</Text>
          </View>
          <View style={styles.performanceDivider} />
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>📊 {stats.onTimePercentage}%</Text>
            <Text style={styles.performanceLabel}>On-Time Delivery</Text>
          </View>
        </View>
      </View>

      {/* Upcoming Jobs */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Jobs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
        
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionBtn} onPress={() => navigation.navigate('Map')}>
            <Text style={styles.quickActionIcon}>🗺️</Text>
            <Text style={styles.quickActionText}>Route Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn} onPress={() => navigation.navigate('Documents')}>
            <Text style={styles.quickActionIcon}>📄</Text>
            <Text style={styles.quickActionText}>Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn} onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.quickActionIcon}>💬</Text>
            <Text style={styles.quickActionText}>Dispatch</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  notificationBtn: {
    position: 'relative',
    padding: 10,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    margin: '1%',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  performanceCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  performanceDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e5e5',
  },
  section: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    color: '#16A34A',
    fontWeight: '600',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routePoint: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  routeLabel: {
    fontSize: 10,
    color: '#999',
  },
  routeCity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  routeArrow: {
    fontSize: 18,
    color: '#999',
    marginHorizontal: 10,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  jobMeta: {
    fontSize: 12,
    color: '#666',
  },
  jobRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  quickActionBtn: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});

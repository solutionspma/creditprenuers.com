import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

// Dummy job list data
const DUMMY_JOBS = [
  {
    id: 'JOB-001',
    status: 'ready',
    pickup: 'Chicago, IL',
    delivery: 'Detroit, MI',
    distance: '282 mi',
    rate: '$650',
    pickupTime: '2:00 PM Today',
  },
  {
    id: 'JOB-002',
    status: 'scheduled',
    pickup: 'Detroit, MI',
    delivery: 'Cleveland, OH',
    distance: '171 mi',
    rate: '$420',
    pickupTime: '9:00 AM Tomorrow',
  },
  {
    id: 'JOB-003',
    status: 'completed',
    pickup: 'Indianapolis, IN',
    delivery: 'Chicago, IL',
    distance: '183 mi',
    rate: '$480',
    pickupTime: 'Yesterday',
  },
  {
    id: 'JOB-004',
    status: 'completed',
    pickup: 'Milwaukee, WI',
    delivery: 'Indianapolis, IN',
    distance: '269 mi',
    rate: '$590',
    pickupTime: '2 days ago',
  },
  {
    id: 'JOB-005',
    status: 'completed',
    pickup: 'Columbus, OH',
    delivery: 'Milwaukee, WI',
    distance: '410 mi',
    rate: '$890',
    pickupTime: '3 days ago',
  },
];

export default function JobList({ navigation }) {
  const [jobs, setJobs] = useState(DUMMY_JOBS);
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    // In production, fetch real data from API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['ready', 'scheduled', 'in-progress'].includes(job.status);
    if (filter === 'completed') return job.status === 'completed';
    return true;
  });

  function FilterButton({ label, value }) {
    return (
      <TouchableOpacity
        style={[styles.filterBtn, filter === value && styles.filterBtnActive]}
        onPress={() => setFilter(value)}
      >
        <Text style={[styles.filterText, filter === value && styles.filterTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  function StatusBadge({ status }) {
    const config = {
      ready: { bg: '#D1FAE5', text: '#059669', label: 'Ready' },
      scheduled: { bg: '#DBEAFE', text: '#2563EB', label: 'Scheduled' },
      'in-progress': { bg: '#FEF3C7', text: '#D97706', label: 'In Progress' },
      completed: { bg: '#E5E7EB', text: '#4B5563', label: 'Completed' },
    };
    const c = config[status] || config.completed;
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: c.bg }]}>
        <Text style={[styles.statusText, { color: c.text }]}>{c.label}</Text>
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
          <StatusBadge status={job.status} />
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routePoint}>
            <Text style={styles.routeIcon}>📍</Text>
            <Text style={styles.routeCity}>{job.pickup}</Text>
          </View>
          <View style={styles.routeLine}>
            <View style={styles.routeLineInner} />
            <Text style={styles.routeDistance}>{job.distance}</Text>
          </View>
          <View style={styles.routePoint}>
            <Text style={styles.routeIcon}>🏁</Text>
            <Text style={styles.routeCity}>{job.delivery}</Text>
          </View>
        </View>

        <View style={styles.jobFooter}>
          <Text style={styles.pickupTime}>⏰ {job.pickupTime}</Text>
          <Text style={styles.rate}>{job.rate}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <FilterButton label="All" value="all" />
        <FilterButton label="Active" value="active" />
        <FilterButton label="Completed" value="completed" />
      </View>

      {/* Stats Summary */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {jobs.filter(j => ['ready', 'scheduled'].includes(j.status)).length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {jobs.filter(j => j.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#16A34A' }]}>
            ${jobs.reduce((sum, j) => sum + parseInt(j.rate.replace('$', '')), 0)}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#16A34A']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyText}>No jobs found</Text>
            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  filterBtnActive: {
    backgroundColor: '#16A34A',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e5e5',
  },
  listContent: {
    padding: 15,
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
    marginBottom: 15,
  },
  jobId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routeContainer: {
    marginBottom: 15,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  routeCity: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginVertical: 5,
  },
  routeLineInner: {
    width: 2,
    height: 20,
    backgroundColor: '#e5e5e5',
    marginRight: 15,
  },
  routeDistance: {
    fontSize: 13,
    color: '#666',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  pickupTime: {
    fontSize: 13,
    color: '#666',
  },
  rate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

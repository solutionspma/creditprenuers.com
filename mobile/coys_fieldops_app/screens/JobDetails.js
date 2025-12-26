import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';

// Dummy job data
const DUMMY_JOB = {
  id: 'JOB-001',
  status: 'ready',
  rate: '$650',
  ratePerMile: '$2.30/mi',
  distance: '282 mi',
  weight: '42,000 lbs',
  commodity: 'Auto Parts',
  truckType: 'Dry Van',
  reference: 'REF-2024-0125',
  
  pickup: {
    location: 'Chicago, IL',
    address: '123 Industrial Way, Chicago, IL 60601',
    date: 'Today',
    time: '2:00 PM - 4:00 PM',
    contact: 'John Smith',
    phone: '+1 (312) 555-0123',
    instructions: 'Check in at gate 5. Load will be staged on dock 12. Driver assist required.',
  },
  
  delivery: {
    location: 'Detroit, MI',
    address: '456 Warehouse Blvd, Detroit, MI 48226',
    date: 'Tomorrow',
    time: '8:00 AM - 10:00 AM',
    contact: 'Sarah Johnson',
    phone: '+1 (313) 555-0456',
    instructions: 'FCFS appointment. Unloading bay 3. Call 30 minutes before arrival.',
  },
  
  shipper: {
    name: 'ABC Manufacturing Co.',
    rating: 4.8,
    loads: 156,
  },
  
  documents: [
    { name: 'Rate Confirmation', status: 'signed' },
    { name: 'Bill of Lading', status: 'pending' },
    { name: 'POD', status: 'required' },
  ],
};

export default function JobDetails({ route, navigation }) {
  const [job, setJob] = useState(DUMMY_JOB);
  const [activeTab, setActiveTab] = useState('details');

  function callContact(phone) {
    Linking.openURL(`tel:${phone}`);
  }

  function openMaps(address) {
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });
    Linking.openURL(url);
  }

  function updateStatus(newStatus) {
    Alert.alert(
      'Update Status',
      `Mark this load as "${newStatus}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            setJob({ ...job, status: newStatus });
            // In production, call API to update status
          }
        },
      ]
    );
  }

  function StatusBadge({ status }) {
    const statusConfig = {
      ready: { bg: '#16A34A', text: 'Ready for Pickup' },
      'en-route-pickup': { bg: '#3B82F6', text: 'En Route to Pickup' },
      loading: { bg: '#F59E0B', text: 'Loading' },
      'en-route-delivery': { bg: '#8B5CF6', text: 'En Route to Delivery' },
      unloading: { bg: '#F59E0B', text: 'Unloading' },
      completed: { bg: '#10B981', text: 'Completed' },
    };
    
    const config = statusConfig[status] || { bg: '#6B7280', text: status };
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
        <Text style={styles.statusBadgeText}>{config.text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.jobId}>{job.id}</Text>
          <StatusBadge status={job.status} />
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.rate}>{job.rate}</Text>
          <Text style={styles.rateDetails}>{job.ratePerMile} • {job.distance}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
            Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
          onPress={() => setActiveTab('documents')}
        >
          <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
            Documents
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'details' ? (
          <>
            {/* Load Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Load Information</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Commodity</Text>
                  <Text style={styles.infoValue}>{job.commodity}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoValue}>{job.weight}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Truck Type</Text>
                  <Text style={styles.infoValue}>{job.truckType}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Reference</Text>
                  <Text style={styles.infoValue}>{job.reference}</Text>
                </View>
              </View>
            </View>

            {/* Pickup */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📍 Pickup</Text>
              <View style={styles.locationCard}>
                <Text style={styles.locationCity}>{job.pickup.location}</Text>
                <Text style={styles.locationAddress}>{job.pickup.address}</Text>
                <View style={styles.locationTime}>
                  <Text style={styles.locationTimeText}>
                    📅 {job.pickup.date} • {job.pickup.time}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.contactName}>👤 {job.pickup.contact}</Text>
                  <TouchableOpacity 
                    style={styles.callBtn}
                    onPress={() => callContact(job.pickup.phone)}
                  >
                    <Text style={styles.callBtnText}>📞 Call</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.instructionsBox}>
                  <Text style={styles.instructionsLabel}>Instructions:</Text>
                  <Text style={styles.instructionsText}>{job.pickup.instructions}</Text>
                </View>
              </View>
            </View>

            {/* Delivery */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏁 Delivery</Text>
              <View style={styles.locationCard}>
                <Text style={styles.locationCity}>{job.delivery.location}</Text>
                <Text style={styles.locationAddress}>{job.delivery.address}</Text>
                <View style={styles.locationTime}>
                  <Text style={styles.locationTimeText}>
                    📅 {job.delivery.date} • {job.delivery.time}
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.contactName}>👤 {job.delivery.contact}</Text>
                  <TouchableOpacity 
                    style={styles.callBtn}
                    onPress={() => callContact(job.delivery.phone)}
                  >
                    <Text style={styles.callBtnText}>📞 Call</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.instructionsBox}>
                  <Text style={styles.instructionsLabel}>Instructions:</Text>
                  <Text style={styles.instructionsText}>{job.delivery.instructions}</Text>
                </View>
              </View>
            </View>

            {/* Shipper */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shipper</Text>
              <View style={styles.shipperCard}>
                <Text style={styles.shipperName}>{job.shipper.name}</Text>
                <View style={styles.shipperStats}>
                  <Text style={styles.shipperStat}>⭐ {job.shipper.rating}</Text>
                  <Text style={styles.shipperStat}>📦 {job.shipper.loads} loads</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* Documents Tab */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required Documents</Text>
            {job.documents.map((doc, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.documentRow}
                onPress={() => navigation.navigate('Documents', { doc })}
              >
                <View style={styles.documentInfo}>
                  <Text style={styles.documentIcon}>
                    {doc.status === 'signed' ? '✅' : doc.status === 'pending' ? '⏳' : '📄'}
                  </Text>
                  <Text style={styles.documentName}>{doc.name}</Text>
                </View>
                <View style={[
                  styles.documentStatus,
                  { backgroundColor: 
                    doc.status === 'signed' ? '#D1FAE5' : 
                    doc.status === 'pending' ? '#FEF3C7' : '#E5E7EB'
                  }
                ]}>
                  <Text style={[
                    styles.documentStatusText,
                    { color:
                      doc.status === 'signed' ? '#059669' :
                      doc.status === 'pending' ? '#D97706' : '#4B5563'
                    }
                  ]}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>📤 Upload Document</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.mapBtn}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.mapBtnText}>🗺️ Navigate</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.statusBtn}
          onPress={() => updateStatus('en-route-pickup')}
        >
          <Text style={styles.statusBtnText}>Update Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rate: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16A34A',
    marginRight: 10,
  },
  rateDetails: {
    fontSize: 14,
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#16A34A',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#16A34A',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 2,
  },
  locationCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  locationCity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  locationTime: {
    marginTop: 10,
    backgroundColor: '#E5E7EB',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  locationTimeText: {
    fontSize: 13,
    color: '#374151',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  contactName: {
    fontSize: 14,
    color: '#1f2937',
  },
  callBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  callBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  instructionsBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  instructionsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
  shipperCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  shipperName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  shipperStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  shipperStat: {
    marginRight: 20,
    fontSize: 14,
    color: '#666',
  },
  documentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  documentName: {
    fontSize: 15,
    color: '#1f2937',
  },
  documentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  documentStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  uploadBtn: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadBtnText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  mapBtn: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  mapBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  statusBtn: {
    flex: 2,
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statusBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

// Dummy documents data
const DUMMY_DOCUMENTS = {
  required: [
    { id: 'rc-001', name: 'Rate Confirmation', status: 'signed', date: 'Jan 25, 2024' },
    { id: 'bol-001', name: 'Bill of Lading', status: 'pending', date: null },
    { id: 'pod-001', name: 'Proof of Delivery', status: 'required', date: null },
  ],
  compliance: [
    { id: 'cdl-001', name: 'CDL License', status: 'valid', expiry: 'Dec 2025' },
    { id: 'med-001', name: 'Medical Certificate', status: 'valid', expiry: 'Aug 2024' },
    { id: 'ins-001', name: 'Insurance Card', status: 'valid', expiry: 'Mar 2024' },
    { id: 'mvr-001', name: 'MVR Report', status: 'expiring', expiry: 'Feb 2024' },
  ],
  uploaded: [
    { id: 'up-001', name: 'Load Photo - Chicago', type: 'image', date: 'Jan 25, 2024' },
    { id: 'up-002', name: 'Delivery Receipt', type: 'pdf', date: 'Jan 24, 2024' },
  ],
};

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState(DUMMY_DOCUMENTS);
  const [activeSection, setActiveSection] = useState('load');

  async function handleUpload() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        Alert.alert('Success', `Document "${result.name}" uploaded successfully`);
        // In production, upload to server
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload document');
    }
  }

  function getStatusConfig(status) {
    const configs = {
      signed: { bg: '#D1FAE5', text: '#059669', icon: '✅' },
      pending: { bg: '#FEF3C7', text: '#D97706', icon: '⏳' },
      required: { bg: '#FEE2E2', text: '#DC2626', icon: '📄' },
      valid: { bg: '#D1FAE5', text: '#059669', icon: '✅' },
      expiring: { bg: '#FEF3C7', text: '#D97706', icon: '⚠️' },
      expired: { bg: '#FEE2E2', text: '#DC2626', icon: '❌' },
    };
    return configs[status] || configs.required;
  }

  function DocumentCard({ doc, showExpiry }) {
    const config = getStatusConfig(doc.status);
    
    return (
      <TouchableOpacity style={styles.docCard}>
        <View style={styles.docInfo}>
          <Text style={styles.docIcon}>{config.icon}</Text>
          <View style={styles.docDetails}>
            <Text style={styles.docName}>{doc.name}</Text>
            <Text style={styles.docMeta}>
              {showExpiry 
                ? `Expires: ${doc.expiry}` 
                : doc.date || 'Not uploaded'
              }
            </Text>
          </View>
        </View>
        <View style={[styles.docStatus, { backgroundColor: config.bg }]}>
          <Text style={[styles.docStatusText, { color: config.text }]}>
            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function SectionTab({ label, value, icon }) {
    return (
      <TouchableOpacity
        style={[styles.sectionTab, activeSection === value && styles.sectionTabActive]}
        onPress={() => setActiveSection(value)}
      >
        <Text style={styles.sectionTabIcon}>{icon}</Text>
        <Text style={[
          styles.sectionTabText, 
          activeSection === value && styles.sectionTabTextActive
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Section Tabs */}
      <View style={styles.sectionTabs}>
        <SectionTab label="Load Docs" value="load" icon="📋" />
        <SectionTab label="Compliance" value="compliance" icon="🛡️" />
        <SectionTab label="Uploaded" value="uploaded" icon="📤" />
      </View>

      <ScrollView style={styles.content}>
        {activeSection === 'load' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Required Documents</Text>
              <Text style={styles.sectionSubtitle}>For current load JOB-001</Text>
            </View>

            {documents.required.map(doc => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}

            <View style={styles.helpBox}>
              <Text style={styles.helpIcon}>💡</Text>
              <Text style={styles.helpText}>
                Tap on a document to view, sign, or upload. All documents must be 
                completed before delivery can be marked as finished.
              </Text>
            </View>
          </>
        )}

        {activeSection === 'compliance' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Compliance Documents</Text>
              <Text style={styles.sectionSubtitle}>Your driver certifications</Text>
            </View>

            {documents.compliance.map(doc => (
              <DocumentCard key={doc.id} doc={doc} showExpiry />
            ))}

            <View style={styles.alertBox}>
              <Text style={styles.alertIcon}>⚠️</Text>
              <View>
                <Text style={styles.alertTitle}>Action Required</Text>
                <Text style={styles.alertText}>
                  Your MVR Report expires in 15 days. Please upload updated documentation.
                </Text>
              </View>
            </View>
          </>
        )}

        {activeSection === 'uploaded' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Uploads</Text>
              <Text style={styles.sectionSubtitle}>Your uploaded files</Text>
            </View>

            {documents.uploaded.map(doc => (
              <TouchableOpacity key={doc.id} style={styles.uploadedCard}>
                <Text style={styles.uploadedIcon}>
                  {doc.type === 'image' ? '🖼️' : '📄'}
                </Text>
                <View style={styles.uploadedInfo}>
                  <Text style={styles.uploadedName}>{doc.name}</Text>
                  <Text style={styles.uploadedDate}>{doc.date}</Text>
                </View>
                <Text style={styles.viewBtn}>View</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      {/* Upload Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
          <Text style={styles.uploadBtnIcon}>📤</Text>
          <Text style={styles.uploadBtnText}>Upload Document</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraBtn}>
          <Text style={styles.cameraBtnIcon}>📸</Text>
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
  sectionTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  sectionTabActive: {
    backgroundColor: '#D1FAE5',
  },
  sectionTabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  sectionTabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  sectionTabTextActive: {
    color: '#059669',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  docCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  docInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  docIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  docDetails: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  docMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  docStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  docStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  helpBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  helpIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
  },
  alertText: {
    fontSize: 13,
    color: '#92400E',
    marginTop: 4,
    lineHeight: 18,
  },
  uploadedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  uploadedIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  uploadedInfo: {
    flex: 1,
  },
  uploadedName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  uploadedDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  viewBtn: {
    color: '#16A34A',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  uploadBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  uploadBtnIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraBtn: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 12,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtnIcon: {
    fontSize: 22,
  },
});

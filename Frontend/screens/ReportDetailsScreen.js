import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReportDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      
      <ScrollView style={styles.content}>
        <View style={styles.reportCard}>
          <Ionicons name="car" size={40} color="#FFD700" />
          <Text style={styles.reportTitle}>Cars Report</Text>
          <Text style={styles.reportDescription}>View all car details and status reports</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Report</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reportCard}>
          <Ionicons name="people" size={40} color="#FFD700" />
          <Text style={styles.reportTitle}>Customers Report</Text>
          <Text style={styles.reportDescription}>View all customer details and history</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Report</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reportCard}>
          <Ionicons name="map" size={40} color="#FFD700" />
          <Text style={styles.reportTitle}>Trips Report</Text>
          <Text style={styles.reportDescription}>View all trip details and earnings</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Report</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reportCard}>
          <Ionicons name="cash" size={40} color="#FFD700" />
          <Text style={styles.reportTitle}>Financial Report</Text>
          <Text style={styles.reportDescription}>View financial reports and analytics</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A1A1A',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  content: {
    padding: 20,
  },
  reportCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#333',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#FFF',
  },
  reportDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
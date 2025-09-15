import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');

  // Sample car data
  const featuredCars = [
    {
      id: 1,
      name: 'Porsche 911',
      type: 'Sports Car',
      price: '$120/day',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
    },
    {
      id: 2,
      name: 'BMW M4',
      type: 'Luxury Coupe',
      price: '$95/day',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000',
    },
  
  ];


  const renderTabContent = () => {
    switch (activeTab) {
      // case 'Profile':
      //   return (
      //     <View style={styles.tabContent}>
      //       <Text style={styles.tabTitle}>Profile</Text>
      //       <View style={styles.profileSection}>
      //         <Image 
      //           source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' }}
      //           style={styles.profileImage}
      //         />
      //         <Text style={styles.profileName}>John Doe</Text>
      //         <Text style={styles.profileEmail}>john.doe@example.com</Text>
      //       </View>
            
      //       <View style={styles.profileMenu}>
      //         <TouchableOpacity style={styles.menuItem}>
      //           <Ionicons name="person" size={20} color="#FFD700" />
      //           <Text style={styles.menuText}>Personal Information</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.menuItem}>
      //           <Ionicons name="document-text" size={20} color="#FFD700" />
      //           <Text style={styles.menuText}>Booking History</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.menuItem}>
      //           <Ionicons name="card" size={20} color="#FFD700" />
      //           <Text style={styles.menuText}>Payment Methods</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.menuItem}>
      //           <Ionicons name="heart" size={20} color="#FFD700" />
      //           <Text style={styles.menuText}>Favorites</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   );
      
      // case 'Settings':
      //   return (
      //     <View style={styles.tabContent}>
      //       <Text style={styles.tabTitle}>Settings</Text>
            
      //       <View style={styles.settingsSection}>
      //         <Text style={styles.settingsGroupTitle}>Account Settings</Text>
              
      //         <TouchableOpacity style={styles.settingItem}>
      //           <Ionicons name="notifications" size={20} color="#FFD700" />
      //           <Text style={styles.settingText}>Notifications</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.settingItem}>
      //           <Ionicons name="lock-closed" size={20} color="#FFD700" />
      //           <Text style={styles.settingText}>Privacy & Security</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.settingItem}>
      //           <Ionicons name="language" size={20} color="#FFD700" />
      //           <Text style={styles.settingText}>Language</Text>
      //           <Text style={styles.settingValue}>English</Text>
      //         </TouchableOpacity>
      //       </View>
            
      //       <View style={styles.settingsSection}>
      //         <Text style={styles.settingsGroupTitle}>Support</Text>
              
      //         <TouchableOpacity style={styles.settingItem}>
      //           <Ionicons name="help-circle" size={20} color="#FFD700" />
      //           <Text style={styles.settingText}>Help Center</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.settingItem}>
      //           <Ionicons name="document-text" size={20} color="#FFD700" />
      //           <Text style={styles.settingText}>Terms of Service</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
              
      //         <TouchableOpacity style={styles.settingItem}>
      //           <Ionicons name="shield-checkmark" size={20} color="#FFD700" />
      //           <Text style={styles.settingText}>Privacy Policy</Text>
      //           <Ionicons name="chevron-forward" size={20} color="#666" />
      //         </TouchableOpacity>
      //       </View>
            
      //       <TouchableOpacity style={styles.logoutButton}>
      //         <Ionicons name="log-out" size={20} color="#FF0000" />
      //         <Text style={styles.logoutText}>Log Out</Text>
      //       </TouchableOpacity>
      //     </View>
      //   );
      
      default:
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Promo Banner */}
            <View style={styles.promoBanner}>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Weekend Special</Text>
                <Text style={styles.promoText}>Get 15% off on luxury cars</Text>
                <TouchableOpacity style={styles.promoButton}>
                  <Text style={styles.promoButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1549399542-7e821f1f6a38?q=80&w=500' }}
                style={styles.promoImage}
              />
            </View>

            {/* Featured Cars */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Luxury Cars</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CarDetails')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              {featuredCars.map(car => (
                <TouchableOpacity 
                  key={car.id} 
                  style={styles.carCard}
                  onPress={() => navigation.navigate('CarDetails', { car })}
                >
                  <View style={styles.carImageContainer}>
                    <Image 
                      source={{ uri: car.image }} 
                      style={styles.carImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.favoriteIcon}>
                      <Ionicons name="heart-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.carInfo}>
                    <View>
                      <Text style={styles.carName}>{car.name}</Text>
                      <Text style={styles.carType}>{car.type}</Text>
                    </View>
                    <Text style={styles.carPrice}>{car.price}</Text>
                  </View>
                  
                  <View style={styles.carFooter}>
                    <View style={styles.rating}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{car.rating}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.bookButton}
                      onPress={() => navigation.navigate('TripDetails', { car })}
                    >
                      <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Special Offer */}
            <View style={styles.specialOffer}>
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>First Time User?</Text>
                <Text style={styles.offerText}>Get 10% off on your first booking with code WELCOME10</Text>
              </View>
              <Ionicons name="gift" size={40} color="#FFD700" style={styles.offerIcon} />
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Main Content */}
      {renderTabContent()}
      
      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Home' && styles.activeNavItem]}
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={activeTab === 'Home' ? '#FFD700' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Profile' && styles.activeNavItem]}
          onPress={() => setActiveTab('Profile')}
        >
          <Ionicons 
            name="person" 
            size={24} 
            color={activeTab === 'Profile' ? '#FFD700' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Settings' && styles.activeNavItem]}
          onPress={() => setActiveTab('Settings')}
        >
          <Ionicons 
            name="settings" 
            size={24} 
            color={activeTab === 'Settings' ? '#FFD700' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Settings' && styles.activeNavText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  // Tab Content Styles
  tabContent: {
    flex: 1,
    padding: 20,
  },
  tabTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Profile Tab Styles
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#999',
    fontSize: 14,
  },
  profileMenu: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  // Settings Tab Styles
  settingsSection: {
    marginBottom: 25,
  },
  settingsGroupTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    marginBottom: 10,
  },
  settingText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  settingValue: {
    color: '#999',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // Existing Styles (keep all your existing styles below)
  header: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#FFD700',
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#FFD700',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchText: {
    color: '#666',
    marginLeft: 10,
    fontSize: 16,
  },
  promoBanner: {
    backgroundColor: '#FFD700',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 150,
    marginBottom: 20,
  },
  promoContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  promoTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  promoImage: {
    width: 120,
    height: '100%',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FFD700',
    fontSize: 14,
  },
  categoriesContainer: {
    paddingLeft: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  carCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  carImageContainer: {
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: 160,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  carInfo: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carType: {
    color: '#999',
    fontSize: 14,
  },
  carPrice: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 0,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFF',
    marginLeft: 5,
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  specialOffer: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  offerText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  offerIcon: {
    marginLeft: 15,
  },
});
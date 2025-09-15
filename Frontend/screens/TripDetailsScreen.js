import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Modal, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TripDetailsScreen({ navigation }) {
  const [car, setCar] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState('');
  const [advance, setAdvance] = useState('');
  const [balance, setBalance] = useState('');
  const [status, setStatus] = useState('Pending');
  const [aadharImages, setAadharImages] = useState([]);
  const [licenseImages, setLicenseImages] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCarDropdown, setShowCarDropdown] = useState(false);
  
  // Separate date and time picker states
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [activeDateTimeType, setActiveDateTimeType] = useState(null);

  // Sample car data
  const carOptions = [
    { id: 1, name: 'Toyota Camry', number: 'ABC123' },
    { id: 2, name: 'Honda Civic', number: 'XYZ789' },
    { id: 3, name: 'Ford Mustang', number: 'MUS202' },
    { id: 4, name: 'Hyundai i20', number: 'HYN456' },
    { id: 5, name: 'Maruti Swift', number: 'SWT789' },
  ];

  const filteredCars = carOptions.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    car.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateBalance = () => {
    const total = parseFloat(totalAmount) || 0;
    const adv = parseFloat(advance) || 0;
    const calculatedBalance = (total - adv).toFixed(2);
    setBalance(calculatedBalance);
    return calculatedBalance;
  };

  // Update balance whenever totalAmount or advance changes
  React.useEffect(() => {
    calculateBalance();
  }, [totalAmount, advance]);

  const selectCar = (car) => {
    setCar(car.name);
    setShowCarDropdown(false);
    setSearchQuery('');
  };

  // Fixed image picker function for expo-image-picker v17.0.8
  const pickImages = async (setImagesFunction) => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // Launch image picker with correct API for v17.0.8
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      // Handle the result - v17.0.8 uses result.assets array
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImages = result.assets.map(asset => asset.uri);
        setImagesFunction(prevImages => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.log('Error picking images:', error);
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  // Fixed camera function for expo-image-picker v17.0.8
  const takePhoto = async (setImagesFunction) => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera permissions to make this work!');
        return;
      }

      // Launch camera with correct API for v17.0.8
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // Handle the result - v17.0.8 uses result.assets array
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImagesFunction(prevImages => [...prevImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  // Function to remove an image
  const removeImage = (imageUri, imagesArray, setImagesFunction) => {
    const updatedImages = imagesArray.filter(uri => uri !== imageUri);
    setImagesFunction(updatedImages);
  };

  // Function to handle date selection
  const handleDateSelection = (type, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
    
    if (type === 'from') {
      setShowFromDatePicker(false);
      setShowFromTimePicker(true);
      setActiveDateTimeType('from');
    } else {
      setShowToDatePicker(false);
      setShowToTimePicker(true);
      setActiveDateTimeType('to');
    }
  };

  // Function to handle time selection
  const handleTimeSelection = (event, selectedTime) => {
    if (selectedTime) {
      const updatedDate = new Date(tempDate);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      
      if (activeDateTimeType === 'from') {
        setFromDate(updatedDate);
        setShowFromTimePicker(false);
      } else {
        setToDate(updatedDate);
        setShowToTimePicker(false);
      }
    } else {
      // If cancelled, just close the time picker
      if (activeDateTimeType === 'from') {
        setShowFromTimePicker(false);
      } else {
        setShowToTimePicker(false);
      }
    }
    setActiveDateTimeType(null);
  };

  // Function to open date picker
  const openDatePicker = (type) => {
    setTempDate(type === 'from' ? (fromDate || new Date()) : (toDate || new Date()));
    
    if (type === 'from') {
      setShowFromDatePicker(true);
    } else {
      setShowToDatePicker(true);
    }
  };

  // Format date and time separately for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        {/* Car Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Car</Text>
            <TouchableOpacity 
              style={styles.dropdownTrigger}
              onPress={() => setShowCarDropdown(true)}
            >
              <Text style={car ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder}>
                {car || 'Select car from dropdown'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#FFD700" />
            </TouchableOpacity>
          </View>
          
          <Modal
            visible={showCarDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowCarDropdown(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowCarDropdown(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.dropdownModal}>
                    <Text style={styles.modalTitle}>Select a Car</Text>
                    
                    <View style={styles.searchContainer}>
                      <Ionicons name="search" size={20} color="#FFD700" style={styles.searchIcon} />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search cars..."
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={true}
                      />
                    </View>
                    
                    <ScrollView style={styles.dropdownList}>
                      {filteredCars.length > 0 ? (
                        filteredCars.map(carItem => (
                          <TouchableOpacity 
                            key={carItem.id} 
                            style={[
                              styles.carOption,
                              car === carItem.name && styles.carOptionSelected
                            ]}
                            onPress={() => selectCar(carItem)}
                          >
                            <Ionicons 
                              name="car" 
                              size={20} 
                              color={car === carItem.name ? '#FFD700' : '#777'} 
                            />
                            <View style={styles.carInfo}>
                              <Text style={[
                                styles.carName,
                                car === carItem.name && styles.carNameSelected
                              ]}>
                                {carItem.name}
                              </Text>
                              <Text style={styles.carNumber}>{carItem.number}</Text>
                            </View>
                            {car === carItem.name && (
                              <Ionicons name="checkmark-circle" size={20} color="#FFD700" />
                            )}
                          </TouchableOpacity>
                        ))
                      ) : (
                        <View style={styles.noResults}>
                          <Ionicons name="alert-circle" size={24} color="#777" />
                          <Text style={styles.noResultsText}>No cars found</Text>
                        </View>
                      )}
                    </ScrollView>
                    
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={() => setShowCarDropdown(false)}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Car Images</Text>
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => pickImages(setCarImages)}
              >
                <Ionicons name="images" size={20} color="#FFD700" />
                <Text style={styles.imageButtonText}>Upload Images</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => takePhoto(setCarImages)}
              >
                <Ionicons name="camera" size={20} color="#FFD700" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            {carImages.length > 0 && (
              <View style={styles.imagesContainer}>
                {carImages.map((uri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <TouchableOpacity 
                      style={styles.removeImageButton}
                      onPress={() => removeImage(uri, carImages, setCarImages)}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Customer Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter customer name"
              placeholderTextColor="#666"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#666"
              value={customerMobile}
              onChangeText={setCustomerMobile}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter customer address"
              placeholderTextColor="#666"
              value={customerAddress}
              onChangeText={setCustomerAddress}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          
          <View style={styles.inputGroup}>
            {/* <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Aadhar number"
              placeholderTextColor="#666"
              value={aadharNumber}
              onChangeText={setAadharNumber}
              keyboardType="numeric"
            /> */}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Aadhar Images</Text>
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => pickImages(setAadharImages)}
              >
                <Ionicons name="images" size={20} color="#FFD700" />
                <Text style={styles.imageButtonText}>Upload Aadhar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => takePhoto(setAadharImages)}
              >
                <Ionicons name="camera" size={20} color="#FFD700" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            {aadharImages.length > 0 && (
              <View style={styles.imagesContainer}>
                {aadharImages.map((uri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <TouchableOpacity 
                      style={styles.removeImageButton}
                      onPress={() => removeImage(uri, aadharImages, setAadharImages)}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
          
          {/* <View style={styles.inputGroup}>
            <Text style={styles.label}>Driving License Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter license number"
              placeholderTextColor="#666"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
            />
          </View> */}
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload License Images</Text>
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => pickImages(setLicenseImages)}
              >
                <Ionicons name="images" size={20} color="#FFD700" />
                <Text style={styles.imageButtonText}>Upload License</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => takePhoto(setLicenseImages)}
              >
                <Ionicons name="camera" size={20} color="#FFD700" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            {licenseImages.length > 0 && (
              <View style={styles.imagesContainer}>
                {licenseImages.map((uri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <TouchableOpacity 
                      style={styles.removeImageButton}
                      onPress={() => removeImage(uri, licenseImages, setLicenseImages)}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Trip Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>From Date & Time</Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity 
                style={[styles.dateInput, styles.halfWidth]}
                onPress={() => openDatePicker('from')}
              >
                <Text style={fromDate ? styles.dateTimeTextSelected : styles.dateTimeText}>
                  {fromDate ? formatDate(fromDate) : 'Select date'}
                </Text>
                <Ionicons name="calendar" size={16} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timeInput, styles.halfWidth]}
                onPress={() => {
                  setTempDate(fromDate || new Date());
                  setShowFromTimePicker(true);
                  setActiveDateTimeType('from');
                }}
              >
                <Text style={fromDate ? styles.dateTimeTextSelected : styles.dateTimeText}>
                  {fromDate ? formatTime(fromDate) : 'Select time'}
                </Text>
                <Ionicons name="time" size={16} color="#FFD700" />
              </TouchableOpacity>
            </View>
            
            {/* Date Pickers */}
            {showFromDatePicker && (
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => handleDateSelection('from', date)}
              />
            )}
            
            {showFromTimePicker && (
              <DateTimePicker
                value={tempDate}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeSelection}
              />
            )}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>To Date & Time</Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity 
                style={[styles.dateInput, styles.halfWidth]}
                onPress={() => openDatePicker('to')}
              >
                <Text style={toDate ? styles.dateTimeTextSelected : styles.dateTimeText}>
                  {toDate ? formatDate(toDate) : 'Select date'}
                </Text>
                <Ionicons name="calendar" size={16} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timeInput, styles.halfWidth]}
                onPress={() => {
                  setTempDate(toDate || new Date());
                  setShowToTimePicker(true);
                  setActiveDateTimeType('to');
                }}
              >
                <Text style={toDate ? styles.dateTimeTextSelected : styles.dateTimeText}>
                  {toDate ? formatTime(toDate) : 'Select time'}
                </Text>
                <Ionicons name="time" size={16} color="#FFD700" />
              </TouchableOpacity>
            </View>
            
            {/* Date Pickers */}
            {showToDatePicker && (
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => handleDateSelection('to', date)}
              />
            )}
            
            {showToTimePicker && (
              <DateTimePicker
                value={tempDate}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeSelection}
              />
            )}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Amount (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter total amount"
              placeholderTextColor="#666"
              value={totalAmount}
              onChangeText={setTotalAmount}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Advance Paid (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter advance amount"
              placeholderTextColor="#666"
              value={advance}
              onChangeText={setAdvance}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Balance Amount (₹)</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>₹{balance}</Text>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity 
                style={[styles.statusButton, status === 'Pending' && styles.statusButtonActive]}
                onPress={() => setStatus('Pending')}
              >
                <Text style={[styles.statusText, status === 'Pending' && styles.statusTextActive]}>
                  Pending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.statusButton, status === 'Confirmed' && styles.statusButtonActive]}
                onPress={() => setStatus('Confirmed')}
              >
                <Text style={[styles.statusText, status === 'Confirmed' && styles.statusTextActive]}>
                  In travel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.statusButton, status === 'Completed' && styles.statusButtonActive]}
                onPress={() => setStatus('Completed')}
              >
                <Text style={[styles.statusText, status === 'Completed' && styles.statusTextActive]}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save Trip Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdownTrigger: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTextSelected: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownTextPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
  },
  dropdownList: {
    maxHeight: 300,
  },
  carOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  carOptionSelected: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
  },
  carInfo: {
    flex: 1,
    marginLeft: 12,
  },
  carName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  carNameSelected: {
    color: '#FFD700',
  },
  carNumber: {
    fontSize: 14,
    color: '#888',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#888',
    marginTop: 8,
  },
  closeButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  imageButtonText: {
    color: '#FFD700',
    marginLeft: 8,
    fontWeight: '600',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  imageWrapper: {
    position: 'relative',
    margin: 4,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  dateInput: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeText: {
    color: '#666',
    fontSize: 16,
  },
  dateTimeTextSelected: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  balanceContainer: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statusButtonActive: {
    backgroundColor: '#FFD700',
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   formContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2563EB',
//     marginBottom: 16,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     color: '#1F2937',
//     fontSize: 16,
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   dropdownTrigger: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dropdownTextSelected: {
//     color: '#1F2937',
//     fontSize: 16,
//   },
//   dropdownTextPlaceholder: {
//     color: '#9CA3AF',
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dropdownModal: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     width: '90%',
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2563EB',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 16,
//   },
//   searchIcon: {
//     marginRight: 8,
//     color: '#6B7280',
//   },
//   searchInput: {
//     flex: 1,
//     color: '#1F2937',
//     fontSize: 16,
//     paddingVertical: 12,
//   },
//   dropdownList: {
//     maxHeight: 300,
//   },
//   carOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   carOptionSelected: {
//     backgroundColor: '#EFF6FF',
//     borderRadius: 8,
//   },
//   carInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   carName: {
//     fontSize: 16,
//     color: '#1F2937',
//     marginBottom: 4,
//   },
//   carNameSelected: {
//     color: '#2563EB',
//   },
//   carNumber: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   noResults: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   noResultsText: {
//     color: '#6B7280',
//     marginTop: 8,
//   },
//   closeButton: {
//     backgroundColor: '#2563EB',
//     borderRadius: 8,
//     padding: 12,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   closeButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   imageButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   imageButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F9FAFB',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     marginHorizontal: 4,
//   },
//   imageButtonText: {
//     color: '#2563EB',
//     marginLeft: 8,
//     fontWeight: '600',
//   },
//   imagesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   imageWrapper: {
//     position: 'relative',
//     margin: 4,
//   },
//   previewImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   removeImageButton: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   dateTimeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   halfWidth: {
//     width: '48%',
//   },
//   dateInput: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   timeInput: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dateTimeText: {
//     color: '#9CA3AF',
//     fontSize: 16,
//   },
//   dateTimeTextSelected: {
//     color: '#1F2937',
//     fontSize: 16,
//   },
//   balanceContainer: {
//     backgroundColor: '#F9FAFB',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//   },
//   balanceText: {
//     color: '#1F2937',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statusButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#F9FAFB',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     alignItems: 'center',
//     marginHorizontal: 4,
//   },
//   statusButtonActive: {
//     backgroundColor: '#2563EB',
//     borderColor: '#2563EB',
//   },
//   statusText: {
//     color: '#6B7280',
//     fontWeight: '600',
//   },
//   statusTextActive: {
//     color: '#FFFFFF',
//   },
//   submitButton: {
//     backgroundColor: '#2563EB',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     marginBottom: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
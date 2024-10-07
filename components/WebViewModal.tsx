import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const { SERVER_URL } = Constants.expoConfig?.extra || {};

const WebViewModal = ({ documentUrl, visible, onClose }: { documentUrl: string, visible: boolean, onClose: () => void }) => {
  
  // Helper function to determine if the file is a PDF
  const isPdf = (url: string): boolean => {
    return url.toLowerCase().endsWith('.pdf');
  };

  // Helper function to determine if the file is an image
  const isImage = (url: string): boolean => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  // Render PDF or Image based on the file type
  const renderContent = () => {
    if (isPdf(documentUrl)) {
      return (
        <WebView
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(SERVER_URL + documentUrl)}`,
        }}
        style={styles.webView}
        startInLoadingState={true}
        renderLoading={() => <Text>Loading PDF...</Text>}
      />
      );
    } else if (isImage(documentUrl)) {
      return (
        <WebView
          source={{ uri: SERVER_URL + documentUrl }}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => <Text>Loading Image...</Text>}
        />
      );
    } else {
      return <Text style={{ padding: 20 }}>Unsupported file type</Text>;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Modal Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Document Viewer</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Conditionally render PDF or Image */}
        {renderContent()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  webView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
});

export default WebViewModal;

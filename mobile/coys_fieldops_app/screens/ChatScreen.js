import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { telnyxAdapter } from '../services/telnyxAdapter';

// Dummy messages for demo
const DUMMY_MESSAGES = [
  {
    id: '1',
    text: 'Good morning! Your next load is ready at the Chicago warehouse.',
    sender: 'dispatch',
    senderName: 'Dispatch - Marcus',
    timestamp: '9:15 AM',
  },
  {
    id: '2',
    text: 'Copy that, heading there now. ETA 45 minutes.',
    sender: 'driver',
    senderName: 'You',
    timestamp: '9:17 AM',
  },
  {
    id: '3',
    text: 'Perfect. The shipper contact is John Smith at gate 5. Rate confirmation has been sent to your email.',
    sender: 'dispatch',
    senderName: 'Dispatch - Marcus',
    timestamp: '9:18 AM',
  },
  {
    id: '4',
    text: 'Got it. Any special instructions for this load?',
    sender: 'driver',
    senderName: 'You',
    timestamp: '9:20 AM',
  },
  {
    id: '5',
    text: 'Driver assist required. Also, delivery appointment is confirmed for 8 AM tomorrow at Detroit facility.',
    sender: 'dispatch',
    senderName: 'Dispatch - Marcus',
    timestamp: '9:22 AM',
  },
];

export default function ChatScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  function sendMessage() {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'driver',
      senderName: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // In production, send via TELNYX
    // telnyxAdapter.sendMessage(inputText);

    // Simulate dispatch response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = {
          id: (Date.now() + 1).toString(),
          text: 'Message received! Let me check on that for you.',
          sender: 'dispatch',
          senderName: 'Dispatch - Marcus',
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 500);
  }

  function MessageBubble({ message }) {
    const isDriver = message.sender === 'driver';
    
    return (
      <View style={[
        styles.messageContainer,
        isDriver ? styles.driverMessageContainer : styles.dispatchMessageContainer
      ]}>
        {!isDriver && (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isDriver ? styles.driverBubble : styles.dispatchBubble
        ]}>
          {!isDriver && (
            <Text style={styles.senderName}>{message.senderName}</Text>
          )}
          <Text style={[
            styles.messageText,
            isDriver && styles.driverMessageText
          ]}>
            {message.text}
          </Text>
          <Text style={[
            styles.timestamp,
            isDriver && styles.driverTimestamp
          ]}>
            {message.timestamp}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header Info */}
      <View style={styles.chatHeader}>
        <View style={styles.dispatchInfo}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.dispatchName}>Coys Dispatch Center</Text>
        </View>
        <Text style={styles.dispatchStatus}>Online • Usually responds in 2 min</Text>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>Dispatch is typing...</Text>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionBtn}
          onPress={() => setInputText('On my way to pickup')}
        >
          <Text style={styles.quickActionText}>🚚 On my way</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionBtn}
          onPress={() => setInputText('Arrived at pickup')}
        >
          <Text style={styles.quickActionText}>📍 Arrived</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionBtn}
          onPress={() => setInputText('Load completed')}
        >
          <Text style={styles.quickActionText}>✅ Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachBtn}>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendIcon}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatHeader: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  dispatchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16A34A',
    marginRight: 8,
  },
  dispatchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  dispatchStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginLeft: 18,
  },
  messagesList: {
    padding: 15,
    paddingBottom: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  driverMessageContainer: {
    justifyContent: 'flex-end',
  },
  dispatchMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    fontSize: 18,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  dispatchBubble: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
  },
  driverBubble: {
    backgroundColor: '#16A34A',
    borderTopRightRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#1f2937',
    lineHeight: 20,
  },
  driverMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  driverTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },
  typingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  typingText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  quickActionBtn: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  attachBtn: {
    padding: 10,
  },
  attachIcon: {
    fontSize: 22,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
  },
  sendBtn: {
    padding: 10,
    marginLeft: 5,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    fontSize: 22,
  },
});

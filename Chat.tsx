import { useState } from 'react';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { sendMessageToChatGPT } from './openai';

const AiChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<any>('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const botResponse = await sendMessageToChatGPT(input);
      const botMessage = { sender: 'bot', text: botResponse };
      setMessages((prevMessages: any) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        <Text style={styles.systemMessage}>채팅 시작됨</Text>
        <Text style={styles.systemSubMessage}>
          사용자에게 제공되는 답변은 인공지능이 제공하는 것으로 답변이 정확하지 않을 수 있습니다.
          자세한 사항은 전문의에게 직접 문의해 주세요.
        </Text>
        {messages.map((message: any, index: number) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            {message.sender === 'bot' && <Text style={styles.sender}>개인 상담원</Text>}
            <Text style={styles.messageText}>{message.text}</Text>
            {message.sender === 'user' && <Text style={styles.sender}>나</Text>}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력해주세요..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  systemMessage: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  systemSubMessage: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1f5fe',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#bbdefb',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  sender: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AiChatScreen;

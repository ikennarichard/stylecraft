import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack} from '@/components/ui/vstack';
import {HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Badge, BadgeText } from '@/components/ui/badge';
import { 
  Send, 
  Image as ImageIcon, 
  Paperclip,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isFromUser: boolean;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { designerName, itemId, itemName } = params;
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        text: `Hi! I saw you're interested in "${itemName}". I'd love to help you with this piece!`,
        timestamp: new Date(Date.now() - 300000), // 5 mins ago
        isFromUser: false,
        type: 'text',
        status: 'read'
      },
      {
        id: '2', 
        text: 'Hello! Yes, I love the design. Can we discuss customization options?',
        timestamp: new Date(Date.now() - 240000), // 4 mins ago
        isFromUser: true,
        type: 'text',
        status: 'read'
      },
      {
        id: '3',
        text: 'Absolutely! I can customize the colors, size, and even add personal touches. What did you have in mind?',
        timestamp: new Date(Date.now() - 180000), // 3 mins ago
        isFromUser: false,
        type: 'text',
        status: 'read'
      },
      {
        id: '4',
        text: 'I was thinking of a navy blue color instead, and maybe add some gold accents?',
        timestamp: new Date(Date.now() - 120000), // 2 mins ago
        isFromUser: true,
        type: 'text',
        status: 'delivered'
      },
      {
        id: '5',
        text: 'Perfect choice! Navy blue with gold accents will look stunning. I can create a mockup for you to review first.',
        timestamp: new Date(Date.now() - 60000), // 1 min ago
        isFromUser: false,
        type: 'text',
        status: 'read'
      }
    ];
    setMessages(initialMessages);
  }, [itemName]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        timestamp: new Date(),
        isFromUser: true,
        type: 'text',
        status: 'sent'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate designer response after a delay
      setTimeout(() => {
        const designerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getRandomResponse(),
          timestamp: new Date(),
          isFromUser: false,
          type: 'text',
          status: 'sent'
        };
        setMessages(prev => [...prev, designerResponse]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const getRandomResponse = (): string => {
    const responses = [
      "That sounds perfect! Let me work on that for you.",
      "I understand exactly what you're looking for. I can definitely make that happen!",
      "Great idea! I think that will look amazing with the overall design.",
      "I love your vision! Let me prepare some options for you to choose from.",
      "Absolutely! I have some similar pieces in my portfolio that you might like to see.",
      "That's a wonderful choice! When would you need this completed by?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const MessageBubble = ({ msg }: { msg: Message }) => (
    <HStack 
      className={`mb-4 ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}
    >
      {!msg.isFromUser && (
        <Avatar size="sm" className="mr-2">
          <AvatarImage 
            source={{ 
              uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
            }} 
            alt={designerName as string}
          />
          <AvatarFallbackText>{designerName as string}</AvatarFallbackText>
        </Avatar>
      )}
      
      <VStack 
        className={`max-w-xs ${msg.isFromUser ? 'items-end' : 'items-start'}`}
      >
        <Box
          className={`px-4 py-3 rounded-2xl ${
            msg.isFromUser 
              ? 'bg-purple-600 rounded-br-md' 
              : 'bg-white border border-gray-200 rounded-bl-md'
          }`}
        >
          <Text 
            className={`${
              msg.isFromUser ? 'text-white' : 'text-gray-900'
            }`}
          >
            {msg.text}
          </Text>
        </Box>
        
        <HStack className="items-center mt-1 space-x-1">
          <Text size="xs" className="text-gray-500">
            {formatTime(msg.timestamp)}
          </Text>
          {msg.isFromUser && (
            <Box className="w-1 h-1 bg-gray-400 rounded-full" />
          )}
          {msg.isFromUser && (
            <Text size="xs" className={`${
              msg.status === 'read' ? 'text-blue-500' : 
              msg.status === 'delivered' ? 'text-gray-500' : 
              'text-gray-400'
            }`}>
              {msg.status}
            </Text>
          )}
        </HStack>
      </VStack>
    </HStack>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        
        {/* Header */}
        <Card className="bg-white border-b border-gray-200 rounded-none">
          <HStack className="justify-between items-center p-4">
            <HStack className="items-center space-x-3 flex-1">
              <Avatar size="md">
                <AvatarImage 
                  source={{ 
                    uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
                  }} 
                  alt={designerName as string}
                />
                <AvatarFallbackText>{designerName as string}</AvatarFallbackText>
              </Avatar>
              
              <VStack className="flex-1">
                <Heading size="md" className="font-semibold text-gray-900">
                  {designerName}
                </Heading>
                <HStack className="items-center space-x-2">
                  <Box className="w-2 h-2 bg-green-500 rounded-full" />
                  <Text size="sm" className="text-gray-500">
                    Online now
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            
            <HStack className="space-x-2">
              <Pressable className="p-2">
                <Icon as={Phone} size="sm" color="$gray600" />
              </Pressable>
              <Pressable className="p-2">
                <Icon as={Video} size="sm" color="$gray600" />
              </Pressable>
              <Pressable className="p-2">
                <Icon as={MoreVertical} size="sm" color="$gray600" />
              </Pressable>
            </HStack>
          </HStack>
        </Card>

        {/* Item Context Banner */}
        <Card className="mx-4 mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
          <HStack className="items-center space-x-3">
            <Badge className="bg-purple-100">
              <BadgeText className="text-purple-700 text-xs">
                Discussing
              </BadgeText>
            </Badge>
            <Text className="font-medium text-purple-800 flex-1">
              {itemName}
            </Text>
          </HStack>
        </Card>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </ScrollView>

        {/* Input Area */}
        <Card className="bg-white border-t border-gray-200 rounded-none">
          <HStack className="items-end p-4 space-x-3">
            <HStack className="space-x-2">
              <Pressable className="p-2">
                <Icon as={ImageIcon} size="sm" color="$gray600" />
              </Pressable>
              <Pressable className="p-2">
                <Icon as={Paperclip} size="sm" color="$gray600" />
              </Pressable>
            </HStack>
            
            <Box className="flex-1">
              <Input variant="outline" size="lg" className="rounded-full">
                <InputField
                  placeholder="Type a message..."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  maxLength={1000}
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                  blurOnSubmit={false}
                />
              </Input>
            </Box>
            
            <Button
              size="lg"
              className={`rounded-full p-3 ${
                message.trim() ? 'bg-purple-600' : 'bg-gray-300'
              }`}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <ButtonIcon as={Send} color="$white" />
            </Button>
          </HStack>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
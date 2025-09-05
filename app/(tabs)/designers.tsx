import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Filter,
  Heart
} from 'lucide-react-native';

interface Designer {
  id: string;
  name: string;
  avatar: string;
  speciality: string;
  location: string;
  rating: number;
  reviewCount: number;
  followers: number;
  startingPrice: number;
  portfolioImages: string[];
  isVerified: boolean;
  responseTime: string;
}

const designersData: Designer[] = [
  {
    id: '1',
    name: 'Adaora Okafor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    speciality: 'Ankara & Contemporary Wear',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    reviewCount: 127,
    followers: 2340,
    startingPrice: 25000,
    portfolioImages: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop'
    ],
    isVerified: true,
    responseTime: '~2 hours'
  },
  {
    id: '2',
    name: 'Ibrahim Suleiman',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    speciality: 'Leather Goods & Accessories',
    location: 'Kano, Nigeria',
    rating: 4.8,
    reviewCount: 89,
    followers: 1876,
    startingPrice: 15000,
    portfolioImages: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop'
    ],
    isVerified: true,
    responseTime: '~1 hour'
  },
  {
    id: '3',
    name: 'Kemi Adebayo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    speciality: 'Jewelry & Beadwork',
    location: 'Ibadan, Nigeria',
    rating: 4.9,
    reviewCount: 203,
    followers: 3201,
    startingPrice: 8000,
    portfolioImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop'
    ],
    isVerified: false,
    responseTime: '~30 mins'
  },
  {
    id: '4',
    name: 'Chike Okwu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    speciality: 'Traditional & Ceremonial',
    location: 'Abuja, Nigeria',
    rating: 4.7,
    reviewCount: 156,
    followers: 2890,
    startingPrice: 45000,
    portfolioImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop'
    ],
    isVerified: true,
    responseTime: '~4 hours'
  }
];

const DesignerCard = ({ designer }: { designer: Designer }) => (
  <Pressable>
    <Card className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with Avatar and Basic Info */}
      <VStack className="p-5 space-y-4">
        <HStack className="items-center justify-between">
          <HStack className="items-center space-x-3">
            <Box className="relative">
              <Avatar size="lg">
                <AvatarImage source={{ uri: designer.avatar }} alt={designer.name} />
                <AvatarFallbackText>{designer.name}</AvatarFallbackText>
              </Avatar>
              {designer.isVerified && (
                <Badge className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <Text className="text-white text-xs">✓</Text>
                </Badge>
              )}
            </Box>
            
            <VStack className="flex-1">
              <Heading size="md" className="font-bold text-gray-900">
                {designer.name}
              </Heading>
              <Text size="sm" className="text-purple-600 font-medium">
                {designer.speciality}
              </Text>
              <HStack className="items-center space-x-1 mt-1">
                <Icon as={MapPin} size="xs" color="$gray500" />
                <Text size="xs" className="text-gray-500">
                  {designer.location}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          
          <Pressable className="p-2">
            <Icon as={Heart} size="sm" color="$gray400" />
          </Pressable>
        </HStack>

        {/* Stats Row */}
        <HStack className="justify-between items-center">
          <HStack className="items-center space-x-1">
            <Icon as={Star} size="sm" color="$amber400" />
            <Text size="sm" className="font-medium text-gray-900">
              {designer.rating}
            </Text>
            <Text size="sm" className="text-gray-500">
              ({designer.reviewCount} reviews)
            </Text>
          </HStack>
          
          <HStack className="items-center space-x-1">
            <Icon as={Users} size="sm" color="$gray500" />
            <Text size="sm" className="text-gray-600">
              {designer.followers.toLocaleString()} followers
            </Text>
          </HStack>
        </HStack>

        {/* Portfolio Preview */}
        <VStack className="space-y-3">
          <Text className="font-medium text-gray-900">Recent Work</Text>
          <HStack className="space-x-2">
            {designer.portfolioImages.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                className="w-20 h-20 rounded-lg flex-1"
                alt={`Portfolio ${index + 1}`}
              />
            ))}
          </HStack>
        </VStack>

        {/* Bottom Row */}
        <HStack className="justify-between items-center pt-2 border-t border-gray-100">
          <VStack>
            <Text size="sm" className="text-gray-500">Starting from</Text>
            <Text className="font-bold text-emerald-600">
              ₦{designer.startingPrice.toLocaleString()}
            </Text>
          </VStack>
          
          <VStack className="items-end">
            <Text size="sm" className="text-gray-500">Responds in</Text>
            <Text size="sm" className="font-medium text-gray-900">
              {designer.responseTime}
            </Text>
          </VStack>
          
          <Button size="sm" className="bg-purple-600 rounded-full px-6">
            <ButtonText className="text-white font-medium">Contact</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Card>
  </Pressable>
);

export default function DesignersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDesigners = designersData.filter(designer =>
    designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    designer.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    designer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <VStack className="bg-white p-5 space-y-4">
          <HStack className="justify-between items-center">
            <VStack>
              <Heading size="xl" className="font-bold text-gray-900">
                Designers
              </Heading>
              <Text size="sm" className="text-gray-500">
                Find talented creators near you
              </Text>
            </VStack>
            
            <Pressable className="p-2">
              <Icon as={Filter} size="md" color="$gray700" />
            </Pressable>
          </HStack>

          {/* Search Bar */}
          <Input variant="outline" size="lg" className="bg-gray-50 rounded-full">
            <Box className="pl-3">
              <Icon as={Search} size="sm" color="$coolGray400" />
            </Box>
            <InputField
              placeholder="Search designers, specialties..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="ml-2"
            />
          </Input>
        </VStack>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="py-4 pl-5"
        >
          <HStack className="space-x-3">
            {['All', 'Clothing', 'Accessories', 'Jewelry', 'Traditional', 'Contemporary'].map((filter) => (
              <Pressable key={filter}>
                <Badge 
                  variant={filter === 'All' ? 'solid' : 'outline'}
                  className={`px-4 py-2 rounded-full ${
                    filter === 'All' 
                      ? 'bg-purple-600' 
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <BadgeText 
                    className={`font-medium ${
                      filter === 'All' ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {filter}
                  </BadgeText>
                </Badge>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>

        <VStack className="px-5">
          {filteredDesigners.map(designer => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
          
          {filteredDesigners.length === 0 && (
            <Box className="items-center justify-center py-12">
              <Text className="text-gray-500 text-center">
                No designers found matching your search
              </Text>
            </Box>
          )}
        </VStack>

        <Box className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
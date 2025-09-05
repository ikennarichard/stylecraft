import React, { useState } from 'react';
import { ScrollView, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@/components/ui/divider';
import { 
  Heart, 
  Share2, 
  Star, 
  MessageCircle, 
  CheckCircle,
  Truck,
  RotateCcw,
  Shield,
  MapPin
} from 'lucide-react-native';

export default function ItemDetailsScreen() {
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id,
    name,
    designer,
    price,
    image,
    description,
    category,
    isAvailable,
    rating,
    likes
  } = params;

  const handleContactDesigner = () => {
    router.push({
      pathname: '/chat',
      params: {
        designerName: designer,
        itemId: id,
        itemName: name
      }
    });
  };

  const handleOrderNow = () => {
    if (isAvailable === 'false') {
      Alert.alert('Item Unavailable', 'This item is currently sold out.');
      return;
    }

    Alert.alert(
      'Order Confirmation',
      `Would you like to order "${name}" for ₦${parseInt(price as string).toLocaleString()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Order Now',
          onPress: () => {
            Alert.alert('Success!', 'Your order has been placed. The designer will contact you soon.');
          }
        }
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing "${name}" by ${designer} on StyleCraft! Only ₦${parseInt(price as string).toLocaleString()}`,
        title: name as string,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const features = [
    { icon: CheckCircle, text: 'Handcrafted with premium materials', color: '$emerald500' },
    { icon: Truck, text: 'Free delivery within Lagos', color: '$blue500' },
    { icon: RotateCcw, text: '7-day return policy', color: '$purple500' },
    { icon: Shield, text: 'Quality guarantee', color: '$orange500' },
  ];

  const similarItems = [
    {
      id: '1',
      image: `https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop`,
      price: 35000
    },
    {
      id: '2', 
      image: `https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop`,
      price: 42000
    },
    {
      id: '3',
      image: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop`,
      price: 18500
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Hero Image */}
        <Box className="relative">
          <Image
            source={{ uri: image as string }}
            className="w-full h-96"
            alt={name as string}
          />
          
          {/* Action Buttons Overlay */}
          <HStack className="absolute top-4 right-4 space-x-2">
            <Pressable 
              onPress={handleShare}
              className="bg-white/90 p-3 rounded-full shadow-sm"
            >
              <Icon as={Share2} size="sm" color="$gray700" />
            </Pressable>
            <Pressable 
              onPress={toggleFavorite}
              className="bg-white/90 p-3 rounded-full shadow-sm"
            >
              <Icon 
                as={Heart} 
                size="sm" 
                color={isFavorite ? "$red500" : "$gray700"} 
              />
            </Pressable>
          </HStack>

          {/* Availability Badge */}
          {isAvailable === 'false' && (
            <Badge className="absolute top-4 left-4 bg-red-500">
              <BadgeText className="text-white font-medium">Sold Out</BadgeText>
            </Badge>
          )}
        </Box>

        <VStack className="p-5 space-y-6">
          
          {/* Title and Price */}
          <HStack className="justify-between items-start">
            <VStack className="flex-1 mr-4">
              <Heading size="xl" className="font-bold text-gray-900 mb-1">
                {name}
              </Heading>
              <HStack className="items-center space-x-2">
                <Icon as={Star} size="sm" color="$amber400" />
                <Text size="sm" className="text-gray-600">
                  {rating} • {likes} likes
                </Text>
              </HStack>
            </VStack>
            <Heading size="xl" className="font-bold text-emerald-600">
              ₦{parseInt(price as string).toLocaleString()}
            </Heading>
          </HStack>

          {/* Designer Info */}
          <Card className="p-4 bg-gray-50 rounded-2xl">
            <HStack className="justify-between items-center">
              <HStack className="items-center space-x-3">
                <Avatar size="md">
                  <AvatarImage 
                    source={{ 
                      uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face'
                    }} 
                    alt={designer as string}
                  />
                  <AvatarFallbackText>{designer as string}</AvatarFallbackText>
                </Avatar>
                <VStack>
                  <Text className="font-semibold text-gray-900">
                    {designer}
                  </Text>
                  <HStack className="items-center space-x-1">
                    <Icon as={MapPin} size="xs" color="$gray500" />
                    <Text size="sm" className="text-gray-500">
                      Lagos, Nigeria
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <Button size="sm" variant="outline" className="rounded-full">
                <ButtonText className="text-purple-600">Follow</ButtonText>
              </Button>
            </HStack>
          </Card>

          {/* Category Badge */}
          <HStack>
            <Badge 
              variant="outline" 
              className={`
                ${category === 'clothing' ? 'border-blue-300 bg-blue-50' : ''}
                ${category === 'accessories' ? 'border-purple-300 bg-purple-50' : ''}
                ${category === 'shoes' ? 'border-green-300 bg-green-50' : ''}
              `}
            >
              <BadgeText 
                className={`
                  font-medium capitalize
                  ${category === 'clothing' ? 'text-blue-600' : ''}
                  ${category === 'accessories' ? 'text-purple-600' : ''}
                  ${category === 'shoes' ? 'text-green-600' : ''}
                `}
              >
                {category}
              </BadgeText>
            </Badge>
          </HStack>

          {/* Description */}
          <VStack className="space-y-3">
            <Heading size="lg" className="font-semibold text-gray-900">
              Description
            </Heading>
            <Text className="text-gray-600 leading-6">
              {description}
            </Text>
          </VStack>

          <Divider className="bg-gray-200" />

          {/* Features */}
          <VStack className="space-y-4">
            <Heading size="lg" className="font-semibold text-gray-900">
              What's Included
            </Heading>
            <VStack className="space-y-3">
              {features.map((feature, index) => (
                <HStack key={index} className="items-center space-x-3">
                  <Icon as={feature.icon} size="sm" color={feature.color} />
                  <Text className="text-gray-600 flex-1">
                    {feature.text}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>

          <Divider className="bg-gray-200" />

          {/* Similar Items */}
          <VStack className="space-y-4">
            <Heading size="lg" className="font-semibold text-gray-900">
              More from {designer}
            </Heading>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack className="space-x-3">
                {similarItems.map((item) => (
                  <Pressable key={item.id}>
                    <Card className="w-32 rounded-2xl overflow-hidden shadow-sm">
                      <Image 
                        source={{ uri: item.image }} 
                        className="w-full h-32"
                        alt="Similar item"
                      />
                      <Box className="p-3">
                        <Text size="sm" className="font-semibold text-emerald-600">
                          ₦{item.price.toLocaleString()}
                        </Text>
                      </Box>
                    </Card>
                  </Pressable>
                ))}
              </HStack>
            </ScrollView>
          </VStack>

          {/* Bottom Spacing */}
          <Box className="h-20" />
        </VStack>
      </ScrollView>

      {/* Bottom Action Bar */}
      <Box className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <HStack className="space-x-3">
          <Button 
            variant="outline"
            onPress={handleContactDesigner}
            className="flex-1 rounded-full border-purple-300"
          >
            <ButtonIcon as={MessageCircle} className="mr-2 text-purple-600" />
            <ButtonText className="text-purple-600 font-semibold">Chat</ButtonText>
          </Button>
          
          <Button 
            className={`flex-2 rounded-full ${isAvailable === 'false' ? 'bg-gray-400' : 'bg-purple-600'}`}
            onPress={handleOrderNow}
            disabled={isAvailable === 'false'}
          >
            <ButtonText className="text-white font-bold">
              {isAvailable === 'false' ? 'Sold Out' : 'Order Now'}
            </ButtonText>
          </Button>
        </HStack>
      </Box>
    </SafeAreaView>
  );
}
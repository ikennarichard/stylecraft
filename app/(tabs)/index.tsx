import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

// Icons
import { ArrowRight, Bell, Heart, Search, Star } from "lucide-react-native";

// Types
interface FashionItem {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  category: "clothing" | "accessories" | "shoes";
  description: string;
  isAvailable: boolean;
  rating: number;
  likes: number;
}

interface Designer {
  id: string;
  name: string;
  avatar: string;
  speciality: string;
  rating: number;
  followers: number;
}

// Sample Data
const sampleFashionItems: FashionItem[] = [
  {
    id: "1",
    name: "Custom Ankara Maxi Dress",
    designer: "Ada Fashion House",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    category: "clothing",
    description:
      "Elegant handcrafted Ankara maxi dress perfect for special occasions.",
    isAvailable: true,
    rating: 4.8,
    likes: 124,
  },
  {
    id: "2",
    name: "Handwoven Leather Tote",
    designer: "Lagos Leather Co",
    price: 28500,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop",
    category: "accessories",
    description:
      "Premium leather tote bag with traditional weaving techniques.",
    isAvailable: true,
    rating: 4.9,
    likes: 89,
  },
  {
    id: "3",
    name: "Royal Agbada with Gold Trim",
    designer: "Royal Threads Nigeria",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    category: "clothing",
    description: "Luxurious traditional Agbada with intricate gold embroidery.",
    isAvailable: true,
    rating: 5.0,
    likes: 203,
  },
  {
    id: "4",
    name: "Beaded Statement Necklace",
    designer: "Afro Beads Collection",
    price: 15500,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    category: "accessories",
    description:
      "Handcrafted beaded necklace with traditional African patterns.",
    isAvailable: false,
    rating: 4.7,
    likes: 67,
  },
];

const featuredDesigners: Designer[] = [
  {
    id: "1",
    name: "Adaora Okafor",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    speciality: "Ankara & Contemporary",
    rating: 4.9,
    followers: 2340,
  },
  {
    id: "2",
    name: "Ibrahim Suleiman",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    speciality: "Leather Craftsman",
    rating: 4.8,
    followers: 1876,
  },
  {
    id: "3",
    name: "Kemi Adebayo",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    speciality: "Jewelry & Accessories",
    rating: 4.9,
    followers: 3201,
  },
];

// Components
const SearchBar = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <Box className="px-5 py-3">
    <Input variant="outline" size="lg" className="bg-white rounded-full">
      <Box className="pl-3">
        <Icon as={Search} size="sm" color="$coolGray400" />
      </Box>
      <InputField
        placeholder="Search designers, styles..."
        value={value}
        onChangeText={onChangeText}
        className="ml-2"
      />
    </Input>
  </Box>
);

const FashionCard = ({ item }: { item: FashionItem }) => (
  <Pressable
    onPress={() => {
      router.push({
        pathname: "/item-details",
        params: {
          id: item.id,
          name: item.name,
          designer: item.designer,
          price: item.price.toString(),
          image: item.image,
          description: item.description,
          category: item.category,
          isAvailable: item.isAvailable.toString(),
          rating: item.rating.toString(),
          likes: item.likes.toString(),
        },
      });
    }}
  >
    <Card className="m-2 mb-6 shadow-lg rounded-2xl overflow-hidden bg-white">
      <Box className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-64"
          alt={item.name}
        />

        {/* Availability Badge */}
        {!item.isAvailable && (
          <Badge className="absolute top-3 left-3 bg-red-500">
            <BadgeText className="text-white font-medium">Sold Out</BadgeText>
          </Badge>
        )}

        {/* Like Button */}
        <Pressable className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
          <Icon as={Heart} size="sm" color="$red500" />
        </Pressable>
      </Box>

      <VStack className="p-4 space-y-2">
        <Heading size="md" className="font-bold text-gray-900">
          {item.name}
        </Heading>

        <Text size="sm" className="text-gray-600">
          by {item.designer}
        </Text>

        <HStack className="justify-between items-center mt-3">
          <Text size="lg" className="font-bold text-emerald-600">
            ₦{item.price.toLocaleString()}
          </Text>

          <HStack className="items-center space-x-2">
            <HStack className="items-center">
              <Icon as={Star} size="xs" color="$amber400" />
              <Text size="xs" className="text-gray-500 ml-1">
                {item.rating}
              </Text>
            </HStack>

            <Badge
              variant="outline"
              className={`
                ${
                  item.category === "clothing"
                    ? "border-blue-300 bg-blue-50"
                    : ""
                }
                ${
                  item.category === "accessories"
                    ? "border-purple-300 bg-purple-50"
                    : ""
                }
                ${
                  item.category === "shoes"
                    ? "border-green-300 bg-green-50"
                    : ""
                }
              `}
            >
              <BadgeText
                className={`
                  text-xs font-medium capitalize
                  ${item.category === "clothing" ? "text-blue-600" : ""}
                  ${item.category === "accessories" ? "text-purple-600" : ""}
                  ${item.category === "shoes" ? "text-green-600" : ""}
                `}
              >
                {item.category}
              </BadgeText>
            </Badge>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  </Pressable>
);

const DesignerCard = ({ designer }: { designer: Designer }) => (
  <Pressable>
    <Card className="w-36 mr-4 bg-white rounded-2xl shadow-md overflow-hidden">
      <VStack className="items-center p-4 space-y-3">
        <Avatar size="lg">
          <AvatarImage source={{ uri: designer.avatar }} alt={designer.name} />
          <AvatarFallbackText>{designer.name}</AvatarFallbackText>
        </Avatar>

        <VStack className="items-center space-y-1">
          <Heading size="sm" className="font-semibold text-center">
            {designer.name}
          </Heading>
          <Text size="xs" className="text-gray-500 text-center">
            {designer.speciality}
          </Text>

          <HStack className="items-center space-x-1">
            <Icon as={Star} size="xs" color="$amber400" />
            <Text size="xs" className="text-gray-600">
              {designer.rating}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  </Pressable>
);

// Main Component
export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = sampleFashionItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomRequest = () => {
    router.push("/custom-request");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HStack className="justify-between items-center px-5 py-4 bg-white">
          <VStack>
            <Heading size="xl" className="font-bold text-gray-900">
              StyleCraft
            </Heading>
            <Text size="sm" className="text-gray-500 mt-1">
              Discover Custom Fashion
            </Text>
          </VStack>

          <Pressable className="p-2">
            <Icon as={Bell} size="md" color="$gray700" />
          </Pressable>
        </HStack>

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        {/* Custom Request Banner */}
        <Box className="mx-5 my-4">
          <Pressable onPress={handleCustomRequest}>
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl overflow-hidden">
              <HStack className="justify-between items-center p-6">
                <VStack className="flex-1">
                  <Heading size="lg" className="font-bold text-white mb-1">
                    Need Something Unique?
                  </Heading>
                  <Text className="text-purple-100">
                    Start your custom design journey
                  </Text>
                </VStack>
                <Icon as={ArrowRight} size="lg" color="$white" />
              </HStack>
            </Card>
          </Pressable>
        </Box>

        {/* Featured Designers */}
        <VStack className="space-y-4 mb-6">
          <Heading size="lg" className="font-bold text-gray-900 px-5">
            Featured Designers
          </Heading>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-5"
          >
            <HStack className="space-x-0">
              {featuredDesigners.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}
            </HStack>
          </ScrollView>
        </VStack>

        {/* Fashion Items */}
        <VStack className="px-3">
          <Heading size="lg" className="font-bold text-gray-900 px-2 mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : "Trending Designs"}
          </Heading>

          {filteredItems.map((item) => (
            <FashionCard key={item.id} item={item} />
          ))}

          {filteredItems.length === 0 && (
            <Box className="items-center justify-center py-12">
              <Text className="text-gray-500 text-center">
                No items found matching your search
              </Text>
            </Box>
          )}
        </VStack>

        {/* Bottom Spacing */}
        <Box className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}

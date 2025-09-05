import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

// Icons
import {
  Camera,
  ChevronDown,
  Footprints,
  Send,
  Shirt,
  ShoppingBag,
  X,
} from "lucide-react-native";

interface CustomRequestForm {
  title: string;
  description: string;
  category: string;
  budget: string;
  timeline: string;
  size: string;
  color: string;
  inspirationImages: string[];
}

const categories = [
  { id: "clothing", name: "Clothing", icon: Shirt },
  { id: "accessories", name: "Accessories", icon: ShoppingBag },
  { id: "shoes", name: "Shoes", icon: Footprints },
];

const budgetRanges = [
  "₦10,000 - ₦25,000",
  "₦25,000 - ₦50,000",
  "₦50,000 - ₦100,000",
  "₦100,000+",
  "Open to discussion",
];

const timelineOptions = ["1 week", "2 weeks", "1 month", "2 months", "No rush"];

export default function CustomRequestScreen() {
  const [formData, setFormData] = useState<CustomRequestForm>({
    title: "",
    description: "",
    category: "",
    budget: "",
    timeline: "",
    size: "",
    color: "",
    inspirationImages: [],
  });

  const updateFormData = (field: keyof CustomRequestForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newImages = [...formData.inspirationImages, result.assets[0].uri];
        updateFormData("inspirationImages", newImages);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.inspirationImages.filter((_, i) => i !== index);
    updateFormData("inspirationImages", newImages);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Please enter a title for your request");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Error", "Please provide a description");
      return false;
    }
    if (!formData.category) {
      Alert.alert("Error", "Please select a category");
      return false;
    }
    if (!formData.budget) {
      Alert.alert("Error", "Please select a budget range");
      return false;
    }
    if (!formData.timeline) {
      Alert.alert("Error", "Please select a timeline");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    Alert.alert(
      "Request Submitted! 🎉",
      "Your custom request has been submitted successfully. Talented designers will start sending you proposals shortly.",
      [
        {
          text: "View Requests",
          onPress: () => router.replace("/(tabs)/requests"),
        },
        {
          text: "Create Another",
          style: "default",
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-8">
          <VStack className="space-y-2">
            <Heading size="xl" className="font-bold text-white">
              Create Custom Request
            </Heading>
            <Text className="text-purple-100">
              Share your vision and let designers bring it to life
            </Text>
          </VStack>
        </Box>

        <VStack className="p-5 space-y-6">
          {/* Request Title */}
          <Card className="p-4 bg-white rounded-2xl">
            <VStack className="space-y-3">
              <Heading size="md" className="font-semibold text-gray-900">
                Request Title *
              </Heading>
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="e.g., Custom Wedding Dress for December"
                  value={formData.title}
                  onChangeText={(text) => updateFormData("title", text)}
                  maxLength={100}
                />
              </Input>
            </VStack>
          </Card>

          {/* Category Selection */}
          <Card className="p-4 bg-white rounded-2xl">
            <VStack className="space-y-4">
              <Heading size="md" className="font-semibold text-gray-900">
                Category *
              </Heading>
              <HStack className="justify-between space-x-3">
                {categories.map((category) => (
                  <Pressable
                    key={category.id}
                    className="flex-1"
                    onPress={() => updateFormData("category", category.id)}
                  >
                    <Card
                      className={`p-4 items-center ${
                        formData.category === category.id
                          ? "bg-purple-50 border-2 border-purple-300"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <Icon
                        as={category.icon}
                        size="lg"
                        color={
                          formData.category === category.id
                            ? "$purple600"
                            : "$gray600"
                        }
                        className="mb-2"
                      />
                      <Text
                        size="sm"
                        className={`font-medium text-center ${
                          formData.category === category.id
                            ? "text-purple-600"
                            : "text-gray-600"
                        }`}
                      >
                        {category.name}
                      </Text>
                    </Card>
                  </Pressable>
                ))}
              </HStack>
            </VStack>
          </Card>

          {/* Description */}
          <Card className="p-4 bg-white rounded-2xl">
            <VStack className="space-y-3">
              <Heading size="md" className="font-semibold text-gray-900">
                Detailed Description *
              </Heading>
              <Text size="sm" className="text-gray-500">
                Be specific about style, materials, occasion, and any special
                requirements
              </Text>
              <Textarea>
                <TextareaInput
                  placeholder="Describe your vision in detail. Include style preferences, materials, colors, occasions, and any inspiration you have..."
                  value={formData.description}
                  onChangeText={(text) => updateFormData("description", text)}
                  className="min-h-32"
                  maxLength={1000}
                />
              </Textarea>
              <Text size="xs" className="text-gray-400 text-right">
                {formData.description.length}/1000 characters
              </Text>
            </VStack>
          </Card>

          {/* Size and Color */}
          <HStack className="space-x-3">
            <Card className="flex-1 p-4 bg-white rounded-2xl">
              <VStack className="space-y-3">
                <Heading size="sm" className="font-medium text-gray-900">
                  Size
                </Heading>
                <Input variant="outline">
                  <InputField
                    placeholder="e.g., Medium, 32, Custom"
                    value={formData.size}
                    onChangeText={(text) => updateFormData("size", text)}
                  />
                </Input>
              </VStack>
            </Card>

            <Card className="flex-1 p-4 bg-white rounded-2xl">
              <VStack className="space-y-3">
                <Heading size="sm" className="font-medium text-gray-900">
                  Preferred Color
                </Heading>
                <Input variant="outline">
                  <InputField
                    placeholder="e.g., Navy Blue, Gold"
                    value={formData.color}
                    onChangeText={(text) => updateFormData("color", text)}
                  />
                </Input>
              </VStack>
            </Card>
          </HStack>

          {/* Budget */}
          <Card className="p-4 bg-white rounded-2xl">
            <VStack className="space-y-3">
              <Heading size="md" className="font-semibold text-gray-900">
                Budget Range *
              </Heading>
              <Select
                selectedValue={formData.budget}
                onValueChange={(value) => updateFormData("budget", value)}
              >
                <SelectTrigger variant="outline" size="lg">
                  <SelectInput placeholder="Select your budget range" />
                  <SelectIcon className="mr-3" as={ChevronDown} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget} label={budget} value={budget} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>
          </Card>

          {/* Timeline */}
          <Card className="p-4 bg-white rounded-2xl">
            <VStack className="space-y-3">
              <Heading size="md" className="font-semibold text-gray-900">
                Timeline *
              </Heading>
              <Select
                selectedValue={formData.timeline}
                onValueChange={(value) => updateFormData("timeline", value)}
              >
                <SelectTrigger variant="outline" size="lg">
                  <SelectInput placeholder="When do you need this completed?" />
                  <SelectIcon className="mr-3" as={ChevronDown} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {timelineOptions.map((timeline) => (
                      <SelectItem
                        key={timeline}
                        label={timeline}
                        value={timeline}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>
          </Card>

          {/* Inspiration Images */}
          <Card className="p-4 bg-white rounded-2xl">
            <VStack className="space-y-4">
              <VStack className="space-y-2">
                <Heading size="md" className="font-semibold text-gray-900">
                  Inspiration Images
                </Heading>
                <Text size="sm" className="text-gray-500">
                  Add photos to help designers understand your vision (up to 5
                  images)
                </Text>
              </VStack>

              <HStack className="flex-wrap space-x-2 space-y-2">
                {formData.inspirationImages.map((image, index) => (
                  <Box key={index} className="relative">
                    <Image
                      source={{ uri: image }}
                      className="w-20 h-20 rounded-xl"
                      alt={`Inspiration ${index + 1}`}
                    />
                    <Pressable
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      onPress={() => removeImage(index)}
                    >
                      <Icon as={X} size="xs" color="$white" />
                    </Pressable>
                  </Box>
                ))}

                {formData.inspirationImages.length < 5 && (
                  <Pressable onPress={pickImage}>
                    <Card className="w-20 h-20 items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                      <Icon as={Camera} size="md" color="$gray400" />
                      <Text size="xs" className="text-gray-500 mt-1">
                        Add
                      </Text>
                    </Card>
                  </Pressable>
                )}
              </HStack>
            </VStack>
          </Card>

          {/* Submit Button */}
          <Button
            className="bg-purple-600 rounded-2xl py-4 shadow-lg"
            onPress={handleSubmit}
          >
            <HStack className="items-center space-x-2">
              <ButtonText className="text-white font-bold text-lg">
                Submit Request
              </ButtonText>
              <ButtonIcon as={Send} className="text-white" />
            </HStack>
          </Button>

          {/* Bottom Spacing */}
          <Box className="h-8" />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

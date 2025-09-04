import { Tabs } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { 
  Home, 
  Users, 
  ClipboardList, 
  User 
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              as={Home} 
              color={color} 
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="designers"
        options={{
          title: 'Designers',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              as={Users} 
              color={color} 
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              as={ClipboardList} 
              color={color} 
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              as={User} 
              color={color} 
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
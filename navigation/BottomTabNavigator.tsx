<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#fff',
      borderTopColor: '#eee',
      height: 65,
      paddingBottom: 10,
    },
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: 2,
    },
    tabBarIcon: ({ color }) => {
      let iconName: any;

      if (route.name === 'Explore') iconName = 'compass-outline';
      else if (route.name === 'Journey') iconName = 'walk-outline';
      else if (route.name === 'Meetups') iconName = 'calendar-outline';
      else if (route.name === 'Inbox') iconName = 'chatbubble-ellipses-outline';
      else if (route.name === 'Profile') iconName = 'person-circle-outline';

      return <Ionicons name={iconName} size={24} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#888',
  })}
>
  <Tab.Screen name="Explore" component={ExploreScreen} />
  <Tab.Screen name="Journey" component={JourneyScreen} />
  <Tab.Screen name="Meetups" component={MeetupsScreen} />
  <Tab.Screen name="Inbox" component={InboxScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
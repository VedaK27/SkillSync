// import React from 'react';
// import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const Navbar2 = ({ route: propRoute }) => {  
//   const route = useRoute();
//   const { title, userId, otherId=null, fromSearch=false, fromSearchFilters=false, fromProject=false, projectId=null } = propRoute.params || {};

//   const navigation = useNavigation();

//   const showConfirmationAlert = () => {
//     Alert.alert(
//       "Changes won't be saved",
//       "Are you sure you want to proceed?",
//       [
//         {
//           text: "No",
//           onPress: () => console.log("User chose No"),
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () => navigation.goBack(),
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   const primaryScreens = ["Search", "QnA", "AddProjectScreen", "Notification", "ViewProfile"];

//   const handleBackPress = () => {
//     console.log("Current route name:", route.name); // Keep for debugging
    
//     if (route.name === "EditProfile") showConfirmationAlert();
//     else if (route.name === "ViewProfile" && otherId && fromProject) {
//       navigation.navigate("ViewProject", { projectType: "myProjects", projectId, userId });
//     }
//     else if (route.name === "ViewProfile" && otherId && fromSearchFilters) {
//       navigation.navigate("SearchFilters", { userId });
//     }
//     else if (route.name === "ViewProfile" && otherId && fromSearch) {
//       navigation.navigate("Search", { userId });
//     }
//     else if (route.name === "ViewProject" && fromSearch && propRoute.params.fromProfile) {
//       navigation.navigate("ViewProfile", { 
//         userId: userId,
//         otherId: propRoute.params.fromProfileId || null,
//         fromSearch: propRoute.params.originalFromSearch || false
//       });
//     }
//     else if (route.name === "SearchFilters") {
//       navigation.navigate("Search", { userId });
//     }
//     else if (route.name === "ViewProject" && fromSearch) {
//       navigation.navigate("Search", { userId });
//     }
//     else if (route.name === "ViewProject") {
//       navigation.goBack();
//     }
//     else if (primaryScreens.includes(route.name)) {
//       navigation.navigate("Home", { userId });
//     } else {
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.navbar}>
//       <Pressable onPress={handleBackPress} style={styles.backButton}>
//         <Image 
//           source={require('../assets/img/notificationPage/backarrow1_icon.png')} 
//           style={styles.backIcon} 
//           resizeMode='contain'
//         />
//       </Pressable>
//       <Text style={styles.title}>{title}</Text>  
//     </View>
//   );
// };

// export default Navbar2;

// const styles = StyleSheet.create({
//   navbar: {
//     backgroundColor: '#7164b4',
//     padding: 15,
//     height: 120,
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center', // Centers the text
//     paddingTop: 30,
//     shadowColor: 'rgba(0, 0, 0, 0.1)',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   backButton: {
//     position: 'absolute',
//     left: 15,
//     top: 40,
//     padding: 10,
//     zIndex: 10, 
//   },
//   backIcon: {
//     width: 30, 
//     height:30,
//     tintColor: "white", 
//   },
//   title: { 
//     fontSize: 25, 
//     fontWeight: 'bold', 
//     color: 'white', 
//     textAlign: 'center', 
//   }, 
// });

import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar2 = ({ route: propRoute }) => {  
  const route = useRoute();
  const navigation = useNavigation();
  
  // Ensure we extract userId from either propRoute or route
  const params = propRoute?.params || {};
  const routeParams = route?.params || {};
  
  const userId = params.userId || routeParams.userId;
  const { 
    title, 
    otherId = null, 
    fromSearch = false, 
    fromSearchFilters = false, 
    fromProject = false, 
    projectId = null 
  } = params;

  console.log("🔍 Navbar2 - Current route:", route.name);
  console.log("🔍 Navbar2 - userId from params:", params.userId);
  console.log("🔍 Navbar2 - userId from route:", routeParams.userId);
  console.log("🔍 Navbar2 - Using userId:", userId);

  const showConfirmationAlert = () => {
    Alert.alert(
      "Changes won't be saved",
      "Are you sure you want to proceed?",
      [
        { text: "No", onPress: () => console.log("User chose No"), style: "cancel" },
        { text: "Yes", onPress: () => safeNavigateBack() }
      ],
      { cancelable: false }
    );
  };

  // Helper function to safely navigate back with userId preserved
  const safeNavigateBack = () => {
    if (!userId) {
      console.warn("Warning: No userId available for back navigation");
      navigation.goBack();
      return;
    }

    // If we're in SearchFilters, explicitly navigate to Search with userId
    if (route.name === "SearchFilters") {
      console.log("📱 Navigating from SearchFilters to Search with userId:", userId);
      navigation.navigate("Search", { userId });
      return;
    }

    // For other screens, try to go back while preserving userId
    try {
      const prevRoute = navigation.getState().routes[navigation.getState().index - 1];
      if (prevRoute) {
        console.log("📱 Attempting to navigate back to:", prevRoute.name);
        navigation.navigate(prevRoute.name, { 
          ...prevRoute.params,
          userId 
        });
      } else {
        console.log("📱 No previous route found, defaulting to Search");
        navigation.navigate("Search", { userId });
      }
    } catch (e) {
      console.log("📱 Error during back navigation, defaulting to Search:", e);
      navigation.navigate("Search", { userId });
    }
  };

  const primaryScreens = ["Search", "QnA", "AddProjectScreen", "Notification", "ViewProfile"];

  const handleBackPress = () => {
    if (!userId) {
      console.warn("⚠️ No userId available in handleBackPress");
    }
    
    if (route.name === "EditProfile") {
      showConfirmationAlert();
    }
    else if (route.name === "ViewProfile" && otherId && fromProject) {
      navigation.navigate("ViewProject", { projectType: "myProjects", projectId, userId });
    }
    else if (route.name === "ViewProfile" && otherId && fromSearchFilters) {
      navigation.navigate("SearchFilters", { userId });
    }
    else if (route.name === "ViewProfile" && otherId && fromSearch) {
      navigation.navigate("Search", { userId });
    }
    else if (route.name === "ViewProject" && fromSearch && params.fromProfile) {
      navigation.navigate("ViewProfile", { 
        userId: userId,
        otherId: params.fromProfileId || null,
        fromSearch: params.originalFromSearch || false
      });
    }
    else if (route.name === "SearchFilters") {
      console.log("📱 Back from SearchFilters to Search with userId:", userId);
      navigation.navigate("Search", { userId });
    }
    else if (route.name === "ViewProject" && fromSearch) {
      navigation.navigate("Search", { userId });
    }
    else if (route.name === "ViewProject") {
      safeNavigateBack();
    }
    else if (primaryScreens.includes(route.name)) {
      navigation.navigate("Home", { userId });
    } else {
      safeNavigateBack();
    }
  };

  return (
    <View style={styles.navbar}>
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <Image 
          source={require('../assets/img/notificationPage/backarrow1_icon.png')} 
          style={styles.backIcon} 
          resizeMode='contain'
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>  
    </View>
  );
};

export default Navbar2;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#7164b4',
    padding: 15,
    height: 120,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the text
    paddingTop: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 40,
    padding: 10,
    zIndex: 10, 
  },
  backIcon: {
    width: 30, 
    height:30,
    tintColor: "white", 
  },
  title: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center', 
  }, 
});
// import React, { useEffect, useState } from "react";
// import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontAwesome } from '@expo/vector-icons';
// import Navbar2 from "../../Components/navbar2";
// import Footer from "../../Components/footer";

// import { fetchAllUsers, fetchAllMentors, fetchAllUsersExceptLoggedIn } from "../services/users_api";
// import { fetchPublicProjects } from "../services/projects_api";

// const manImg = require('../../assets/img/notificationPage/manImg.jpg');
// const avatarImages = {
//   0: require("../../assets/img/avatars/avatar1.png"),
//   1: require("../../assets/img/avatars/avatar2.png"),
//   2: require("../../assets/img/avatars/avatar3.png"),
//   3: require("../../assets/img/avatars/avatar4.png"),
//   4: require("../../assets/img/avatars/avatar5.png"),
// };

// const SearchPage = ({ route }) => {
//   const navigation = useNavigation();
//   const loggedinId = route.params.userId;
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [mentors, setMentors] = useState([]);
//   const [projects, setProjects] = useState([]);
// 	const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);
//       try {
//         const teamData = await fetchAllUsersExceptLoggedIn(loggedinId); // Fetch team members
//         const mentorData = await fetchAllMentors(); // Fetch mentors
//         const projectData = await fetchPublicProjects(); // Fetch projects

//         console.log("Fetched team members:", teamData);
//         console.log("Fetched mentors:", mentorData);
//         console.log("Fetched projects:", projectData);

//         setTeamMembers(teamData);
//         setMentors(mentorData);
//         setProjects(projectData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.card}
//       onPress={() => {
//         if (teamMembers.includes(item) || mentors.includes(item)) {
//           navigation.navigate('ViewProfile', { userId: loggedinId, otherId: item._id, fromSearch: true });
//         }
//         else {
//           navigation.navigate('ViewProject', { projectType: "publicProjects", project: item, userId: loggedinId, fromSearch: true });
//         }
//       }}
//     >
//       {(teamMembers.includes(item) || mentors.includes(item)) && 
//         <View style={styles.profilePicContainer}>
//           <Image
//             source={avatarImages[item.avatar % 5]}
//             style={styles.profilePic}
//           />
//         </View>
//       }
//       {
//         (teamMembers.includes(item) || mentors.includes(item)) && 
//         <Text style={styles.cardText}>{item.username}</Text>
//       }
//       {
//         projects.includes(item) && 
//         <Text style={styles.cardText}>{item.title}</Text>
//       }
//       {
//         projects.includes(item) && 
//         <Text style={styles.subText}>{item.domain}</Text>
//       }
//       {
//         (teamMembers.includes(item) || mentors.includes(item)) && 
//         <View style={styles.ratingContainer}>
//           <FontAwesome name="star" size={16} color="gold" />
//           <Text style={styles.ratingText}>{item.rating}</Text>
//         </View>
//       }
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#7164b4" />
//       </SafeAreaView>
//     );
//   }


//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* <Navbar2 title="Search" /> */}
//       <Navbar2 route={{ params: { title: "Search", userId: loggedinId } }} />
//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => navigation.navigate('SearchFilters', { type: 'mentor' })}>
//           <Text style={styles.heading}>Search for Mentor</Text>
//         </TouchableOpacity>
//         {/* <FlatList horizontal data={mentors} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
//         <FlatList
//           horizontal
//           data={mentors.sort(() => Math.random() - 0.5).slice(0, 6)}
//           renderItem={renderItem}
//           keyExtractor={(item) => item._id.toString()} // Ensure unique key
//         />

//         <TouchableOpacity onPress={() => navigation.navigate('SearchFilters', { type: 'member' })}>
//           <Text style={styles.heading}>Search for Team Member</Text>
//         </TouchableOpacity>
//         {/* <FlatList horizontal data={teamMembers} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
//         <FlatList
//           horizontal
//           data={teamMembers.sort(() => Math.random() - 0.5).slice(0, 6)}
//           renderItem={renderItem}
//           keyExtractor={(item) => item._id.toString()} // Ensure unique key
//         />

//         <TouchableOpacity onPress={() => navigation.navigate('SearchFilters', { type: 'project' })}>
//           <Text style={styles.heading}>Search for Project</Text>
//         </TouchableOpacity>
//         {/* <FlatList horizontal data={projects} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
//         <FlatList
//           horizontal
//           data={projects.sort(() => Math.random() - 0.5).slice(0, 6)}
//           renderItem={renderItem}
//           keyExtractor={(item) => item._id.toString()} // Ensure unique key
//         />

//       </View>
//       {/* <Footer page={"search"} userId={loggedinId} /> */}
//       <Footer route={{ params: { page: "search", userId: loggedinId } }} />
//     </SafeAreaView>
//   );
// };

// export default SearchPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color:"#7164b4", // Lavender color
//   },
//   card: {
//     backgroundColor: "#E6E6FA", // Light lavender background for cards
//     padding: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     marginRight: 15,
//     width: 160,
//     height: 200,
//     justifyContent: "center",
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   subText: {
//     fontSize: 14,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 10,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 5,
//   },
//   ratingText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginLeft: 5,
//   },
//   profilePicContainer: {
//     width: 86, // Slightly larger than the image to create spacing
//     height: 86,
//     borderRadius: 43, // Half of width/height to maintain circular shape
//     borderWidth: 2,
//     borderColor: "#7164B4",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   profilePic: {
//     width: 75,
//     height: 80,
//     borderRadius: 40,
//   },
// });




import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";

import { fetchAllUsers, fetchAllMentors, fetchAllUsersExceptLoggedIn } from "../services/users_api";
import { fetchPublicProjects } from "../services/projects_api";

const avatarImages = {
  0: require("../../assets/img/avatars/avatar1.png"),
  1: require("../../assets/img/avatars/avatar2.png"),
  2: require("../../assets/img/avatars/avatar3.png"),
  3: require("../../assets/img/avatars/avatar4.png"),
  4: require("../../assets/img/avatars/avatar5.png"),
};

const SearchPage = ({ route }) => {
  const navigation = useNavigation();
  const { userId: routeUserId } = route.params || {};
  const loggedinId = routeUserId;
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debug logging
  useEffect(() => {
    console.log("📱 SearchPage - Received route params:", route.params);
    console.log("📱 SearchPage - Using userId:", loggedinId);
    
    if (!loggedinId) {
      console.warn("⚠️ SearchPage - No userId received!");
    }
  }, [route.params, loggedinId]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        if (!loggedinId) {
          console.warn("⚠️ Cannot fetch data without userId");
          setLoading(false);
          return;
        }
        
        const teamData = await fetchAllUsersExceptLoggedIn(loggedinId);
        const mentorData = await fetchAllMentors();
        const projectData = await fetchPublicProjects();

        console.log("Fetched team members count:", teamData?.length || 0);
        console.log("Fetched mentors count:", mentorData?.length || 0);
        console.log("Fetched projects count:", projectData?.length || 0);

        setTeamMembers(teamData || []);
        setMentors(mentorData || []);
        setProjects(projectData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [loggedinId]);

  const handleCardPress = (item, itemType) => {
    if (!loggedinId) {
      console.warn("⚠️ Cannot navigate without userId");
      return;
    }
    
    if (itemType === 'project') {
      navigation.navigate('ViewProject', { 
        projectType: "publicProjects", 
        project: item, 
        userId: loggedinId, 
        fromSearch: true 
      });
    } else {
      navigation.navigate('ViewProfile', { 
        userId: loggedinId, 
        otherId: item._id, 
        fromSearch: true 
      });
    }
  };

  const handleSearchFilterPress = (type) => {
    if (!loggedinId) {
      console.warn("⚠️ Cannot navigate to filters without userId");
      return;
    }
    
    console.log("📱 Navigating to SearchFilters with userId:", loggedinId);
    navigation.navigate('SearchFilters', { 
      type, 
      userId: loggedinId 
    });
  };

  const renderItem = ({ item, section }) => {
    const itemType = section === 'projects' ? 'project' : 'user';
    const displayName = item.username || item.title || item.name || "Unknown";
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handleCardPress(item, itemType)}
      >
        {itemType !== 'project' && 
          <View style={styles.profilePicContainer}>
            <Image
              source={avatarImages[item.avatar % 5]}
              style={styles.profilePic}
            />
          </View>
        }
        
        <Text style={styles.cardText}>{displayName}</Text>
        
        {itemType === 'project' && item.domain && 
          <Text style={styles.subText}>{item.domain}</Text>
        }
        
        {itemType !== 'project' && 
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="gold" />
            <Text style={styles.ratingText}>{item.rating || "N/A"}</Text>
          </View>
        }
      </TouchableOpacity>
    );
  };

  // If we don't have a userId, show an error state
  if (!loggedinId) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Missing user ID. Please try again.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7164b4" />
      </SafeAreaView>
    );
  }

  return (
    
        <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 route={{ params: { title: "Search", userId: loggedinId } }} />
      
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => handleSearchFilterPress('mentors')}>
          <Text style={styles.heading}>Search for Mentor</Text>
        </TouchableOpacity>
        
        <FlatList
          horizontal
          data={mentors.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={({item}) => renderItem({item, section: 'mentors'})}
          keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No mentors found</Text>
            </View>
          }
        />

        <TouchableOpacity onPress={() => handleSearchFilterPress('member')}>
          <Text style={styles.heading}>Search for Team Member</Text>
        </TouchableOpacity>
        
        <FlatList
          horizontal
          data={teamMembers.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={({item}) => renderItem({item, section: 'members'})}
          keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No team members found</Text>
            </View>
          }
        />

        <TouchableOpacity onPress={() => handleSearchFilterPress('project')}>
          <Text style={styles.heading}>Search for Project</Text>
        </TouchableOpacity>
        
        <FlatList
          horizontal
          data={projects.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={({item}) => renderItem({item, section: 'projects'})}
          keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No projects found</Text>
            </View>
          }
        />
      </ScrollView>
      
      <Footer route={{ params: { page: "search", userId: loggedinId } }} />
    </SafeAreaView>
    
    
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color:"#7164b4", // Lavender color
  },
  card: {
    backgroundColor: "#E6E6FA", // Light lavender background for cards
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 15,
    width: 160,
    height: 200,
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  profilePicContainer: {
    width: 86, // Slightly larger than the image to create spacing
    height: 86,
    borderRadius: 43, // Half of width/height to maintain circular shape
    borderWidth: 2,
    borderColor: "#7164B4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 75,
    height: 80,
    borderRadius: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#e53935",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyListContainer: {
    width: 160,
    height: 200,
    backgroundColor: "#E6E6FA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 15,
  },
  emptyListText: {
    color: "#666",
    textAlign: "center",
  }
});
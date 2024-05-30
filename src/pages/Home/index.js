import { useContext } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function Home() {
  const { signOut } = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

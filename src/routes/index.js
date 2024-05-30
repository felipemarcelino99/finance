import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { ActivityIndicator, View } from "react-native";

function Routes() {
  const { signed, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  } 
  
  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;

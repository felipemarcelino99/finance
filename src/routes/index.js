import { View, ActivityIndicator } from "react-native";
import AuthRoutes from "./auth.routes";

function Routes() {
  const loading = false;
  const signed = false;

  return signed ? <Text>Faça Login para continuar</Text> : <AuthRoutes />;
}

export default Routes;

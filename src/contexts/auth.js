import { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      setIsLoading(true);
      const storageUser = await AsyncStorage.getItem("@finToken");

      if (storageUser) {
        const response = await api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch((e) => {
            console.log(e);
            setUser(null);
          });

        api.defaults.headers["Authorization"] = `Bearer ${storageUser}`;
        setIsLoading(false);
        setUser(response.data);
      }
      setIsLoading(false);
    }
    loadStorage();
  }, []);

  async function signUp(name, password, email) {
    setIsLoading(true);
    try {
      const response = await api.post("/users", {
        name: name,
        password: password,
        email: email,
      });

      setUser(response.data);
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao cadastrar usuário:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email, password) {
    setIsLoading(true);
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      const data = { id, name, token, email };

      await AsyncStorage.setItem("@finToken", token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({ id, name, email });
    } catch (err) {
      console.log("Erro ao logar: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, isLoading, user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

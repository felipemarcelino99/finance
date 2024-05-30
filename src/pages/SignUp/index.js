import { ActivityIndicator, Platform } from "react-native";
import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const { isLoading, user, signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (name == "" || password == "" || email == "") return;
    signUp(name, password, email);
  };

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <AreaInput>
          <Input
            placeholder="Seu nome"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Seu e-mail"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Sua senha"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </AreaInput>
        <SubmitButton onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}

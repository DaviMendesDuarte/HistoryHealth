import { registerRootComponent } from "expo";
import App from "./App";
import { UserProvider } from "./src/contexts/UserContext";

function Main() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

registerRootComponent(Main);

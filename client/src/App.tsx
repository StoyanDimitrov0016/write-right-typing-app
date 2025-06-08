import TypingTest from "./components/typing-test";
import RootLayout from "./layouts/root-layout";

// I can create gamification like HayDay when the user opens the site every day for X day and when he make a record and so on

export default function App() {
  return (
    <RootLayout>
      <TypingTest />
    </RootLayout>
  );
}

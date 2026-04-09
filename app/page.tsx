import Intro, { INTRO_END_DELAY_SEC } from "@/components/Intro";
import Text from "@/components/Text";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-zinc-950">
      <Intro />
      <Text variant="logo" delay={0.6}>
        Next Timeline
      </Text>
      <Text delay={INTRO_END_DELAY_SEC}>Blades Mark the Moment</Text>
    </main>
  );
}

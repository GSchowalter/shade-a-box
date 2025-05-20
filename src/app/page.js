import ShadeBox from "@/components/ShadeBox";
import { Canvas } from '@react-three/fiber';
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl">Augie's toy box</h1>
      <ShadeBox />
    </div>
  );
}

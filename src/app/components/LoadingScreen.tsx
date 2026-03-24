import { Sprout } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-700 flex flex-col items-center justify-center">
      <div className="bg-white rounded-full p-8 shadow-2xl mb-6 animate-bounce">
        <Sprout className="size-24 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">AgroPulse</h1>
      <p className="text-green-100 text-lg">Loading agricultural insights...</p>
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

import React, { createContext, useContext } from "react";

// initial state
const INITIAL_STATE = {
  baseColor: "bg-dark-5",
  // highlightColor: "#7a7979",
};

// creating context
const SkeletonThemeContext = createContext<{
  baseColor: string;
  // highlightColor: string;
}>(INITIAL_STATE);

// creating theme provider
export default function SkeletonThemeProvider({
  children,
  baseColor,
}: {
  children: React.ReactNode;
  baseColor: string;
  // highlightColor: string;
}) {
  return (
    <SkeletonThemeContext.Provider value={{ baseColor }}>
      {children}
    </SkeletonThemeContext.Provider>
  );
}

// creating hook for using skelton theme context
export const useSkeletonThemeContext = () => useContext(SkeletonThemeContext);

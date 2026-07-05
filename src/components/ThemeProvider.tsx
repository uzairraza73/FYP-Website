"use client";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 dark-theme">
      {children}
    </div>
  );
};

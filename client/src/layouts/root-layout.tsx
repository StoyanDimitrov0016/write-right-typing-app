import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-16 border-b shadow-sm px-4 flex items-center">
        <h1 className="text-lg font-semibold">Write, right?</h1>
      </header>

      <main className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full">{children}</main>

      <footer className="h-16 border-t text-sm text-muted-foreground flex items-center justify-center">
        © {new Date().getFullYear() > 2025 ? `2025 - ${new Date().getFullYear()}` : 2025}{" "}
        WriteRight. All rights reserved.
      </footer>
    </div>
  );
}

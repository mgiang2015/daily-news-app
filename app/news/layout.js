import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// This layout provide options for news search. Currently adding countries to search, sort by and export.
export default function Layout({ children }) {
  return (
    <div>
        <p>Hello from layout</p>
        {children}
    </div>
  )
}

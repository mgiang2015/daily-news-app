import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Daily News App",
  description: "App that lets you retrieve daily news and read them",
};

export default function RootLayout({ children }) {
  const links = [
    {
      title: "Today's news",
      url: "/news"
    }
  ]
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ minHeight: "3em", padding: "0.5em"  }}>
          <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>Daily News App</h1>
        </div>
        {/* Container for sidebar and children. Flex */}
        <div style={{ display: "flex" }}>
          <div style={{ height: "100%", minWidth: "10em", padding: "0.5em", backgroundImage: "linear-gradient(to right,  #90EE90, white)" }}>
            {/* Sidebar */}
            { 
              links.map(link => {
                  return (
                    <a href={link.url} key={link.url}>
                      <div style={{ marginBottom: "0.5em" }}>{link.title}</div>
                    </a>
                  )
              })
            }
          </div>
          <div style={{ padding: "0.5em" }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

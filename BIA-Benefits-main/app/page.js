"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/system";
import ResponsiveNav from "@/components/ResponsiveNav";
import { useSession, SessionProvider as AuthProvider } from "next-auth/react";

// import Header from "@/admin_dashboards/HeaderOld";


const Background = styled("div")({
  backgroundImage: `url('/img/background.jpg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
});

function HomePage() {
  const { data: session } = useSession();

  return (
    // <body style={{ margin: "0" }}>
    //   <Background>
    //     <ResponsiveNav />
    //     {/* Hero box */}
    //     <Card sx={{ margin: "2rem auto", padding: "2rem", maxWidth: "800px" }}>
    //       <CardMedia
    //         component="img"
    //         height="440"
    //         image="/img/hero.jpg"
    //         alt="benefits"
    //       />
    //       <CardContent>
    //         <Typography
    //           variant="h4"
    //           component="div"
    //           style={{ color: "#1976D2" }}
    //         >
    //           Welcome to our website {session?.user.email}!
    //         </Typography>
    //         <Typography variant="body1" color="text.secondary">
    //           Explore our services and products. Feel free to reach out if you
    //           have any questions.
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   </Background>
    // </body>
    <AuthProvider session={session}>
      <div>
        <ResponsiveNav />

        <h1>Homepage</h1>
      </div>
    </AuthProvider>
  );
}
export default HomePage;

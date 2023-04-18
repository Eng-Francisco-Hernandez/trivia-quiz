import { LayoutProps } from "@/types/layouts";
import { Box, CssBaseline, Container } from "@mui/material";
import React from "react";

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <CssBaseline />
      <Container maxWidth="xl">
        {children}
      </Container>
    </Box>
  );
}

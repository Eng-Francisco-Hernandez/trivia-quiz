import * as React from "react";
import Layout from "@/layouts/Layout";
import QuizProvider from "@/context/QuizContext";
import QuizStepper from "@/components/ui/QuizStepper";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <Layout>
      <div className="stepper-container">
        <Grid container>
          <Grid xs={12} item>
            <QuizProvider>
              <QuizStepper />
            </QuizProvider>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

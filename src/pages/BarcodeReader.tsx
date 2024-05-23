import { useState } from "react";
import Html5QrCodePlugin from "../components/Html5QrCodePlugin";
import { Card, Container, Grid } from "@mui/material";

export const BarcodeReaderPage = () => {
  const [result, setResult] = useState("Nenhum código encontrado");
  const onNewScanResult = (decodedText: string, decodedResult: string) => {
    // handle decoded results here
    console.log(decodedText, decodedResult)
    setResult(`Código encontrado: ${decodedText}`);
    window.alert(decodedText)
  };

  return (
      <Grid container alignItems={"center"} justifyContent={"center"} display={"flex"}>
        <Grid item xs={12} sm={6} md={4} textAlign={"center"}>
            <h3>{result}</h3>
            <Html5QrCodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </Grid>
      </Grid>
  );
};

import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
  <Button onClick={() => navigate(RoutePaths.Home)}>
    <ArrowBack /> <strong>Voltar</strong>
  </Button>
  );
};
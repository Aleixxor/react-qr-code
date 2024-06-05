import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QrCode2, QrCodeScanner } from '@mui/icons-material';
import { RoutePaths } from '../RoutePaths';
import { connectDB, selectDB } from '../utils/dbConnection';
import { useEffect } from 'react';

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    connectDB()
      .then(db => {
        console.log(db);
        selectDB(db, "SELECT TOP 10 * FROM QRCODES")
        .then(res => console.log(res))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Container sx={{mt: 3}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={() => navigate(RoutePaths.Scan)}>
              <CardContent>
                <QrCodeScanner style={{ fontSize: 40 }} />
                <Typography variant="h5">Ler Código</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={() => navigate(RoutePaths.Generate)}>
              <CardContent>
                <QrCode2 style={{ fontSize: 40 }} />
                <Typography variant="h5">Gerar Código</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
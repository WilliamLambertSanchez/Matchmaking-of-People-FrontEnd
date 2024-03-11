import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assurez-vous que Link est importé depuis "react-router-dom"
import userApi from "../api/userApi";
import Header from "./Header";
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseUsers = await userApi.getUsers();
        console.log('responseUsers:', responseUsers);
        setUsers(responseUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  // Formating de date
  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <>
    <Header />
    <Container maxWidth="lg" style={{marginTop:"20px"}}>
      <Typography variant='h4' style={{color: 'primary.light',
             }}>
        Connect
      </Typography>
    {/* <h2>Explore the map and join activities</h2> */}
    <Grid container spacing={3} style={{marginTop:"30px"}}>
      {users && users.length > 0 ? (
        users.map(user => (
          <Grid item xs={1} sm={4} md={4} key={user._id}>
            <Card sx={{ maxWidth: 345, border:"1px solid #1976d2", padding:"18px", textAlign:'center', borderRadius: '5px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(user.createdAt)}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {user.rank}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex", justifyContent:"center", color:'#725C3A'}}>
                <Link to={`/user/${user._id}`} style={{ textDecoration: 'none' }}>
                  <Button size="small" variant="outlined">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))
        ) : (
        <div>Loading...</div>
      )}
    </Grid>  
    </Container>  
    </>
  );
};

import { useEffect, useState } from "react"
import activityApi from "../api/activityApi"
import Header from "../components/Header";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  const [activities, setActivities] = useState([])


  useEffect(() => {
    const getActivity = async () => {
      try {
        const responseActivity = await activityApi.getActivities()
        console.log('response : ', responseActivity)
        setActivities(responseActivity)
      } catch (error) {
        console.error('Error fetching activity:', error)
      }
    }
    getActivity();
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
        Discover
      </Typography>
    {/* <h2>Explore the map and join activities</h2> */}
    <Grid container spacing={3} style={{marginTop:"30px"}}>
      {activities && activities.length > 0 ? (
        activities.map(activity => (
          <Grid item xs={1} sm={4} md={4} key={activity._id}>
            <Card sx={{ maxWidth: 345, border:"1px solid #1976d2", padding:"18px", textAlign:'center', borderRadius: '5px' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {activity.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {formatDate(activity.date)}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex", justifyContent:"center", color:'#725C3A'}}>
                <Link to={`/activity/${activity._id}`} style={{ textDecoration: 'none' }}>
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
  )
}
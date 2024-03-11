import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import activityApi from "../api/activityApi";
import Header from "../components/Header";
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";

export const Search = ({ token }) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getActivity = async () => {
      try {
        const responseActivity = await activityApi.getActivities();
        console.log('response : ', responseActivity);
        setActivities(responseActivity);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    getActivity();
  }, []);



  const handleJoinActivity = async (activityId) => {
    
    try {
      const response = await activityApi.joinActivity(activityId, token);
      console.log('response:', response);

      // Update the activities state or perform additional actions
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === activityId ? { ...activity, participants: response.participants } : activity
        )
      );

      // Fix the typo in the route
      navigate(`/activity/${activityId}`);

      console.log('Joined activity successfully');
    } catch (error) {
      console.error('Error joining activity:', error);
    }
  };

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
        Search and Join activities
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
                <Typography variant="h5" color="#725C3A">
                  Activity created by: {activity.username}
                </Typography>
              </CardContent>
              <CardActions style={{display:"flex", justifyContent:"center", color:'#725C3A'}}>
                <Link to={`/activity/${activity._id}`} style={{ textDecoration: 'none' }}>
                  <Button size="small" variant="outlined" onClick={() => handleJoinActivity(activity._id)}>Join</Button>
                  <Button size="small" variant="outlined">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))
        ) : (
        <div>Loading... please refresh</div>
      )}
    </Grid>  
    </Container>  
    </>
  );
};

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userApi from "../api/userApi";
import activityApi from "../api/activityApi";
import Header from "../components/Header";
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";

export const UserProfile = () => {
  const { userId } = useParams();
  
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseUser = await userApi.getUser(userId);
        setUser(responseUser);

        // Fetch details of activities joined by the user
        const activityDetails = await Promise.all(
          responseUser.activitiesJoined.map(async (activityId) => {
            try {
              const activity = await activityApi.getActivity(activityId);
              return activity;
            } catch (activityError) {
              console.error(`Error fetching activity with ID ${activityId}:`, activityError);
              return null;
            }
          })
        );

        setActivities(activityDetails);
      } catch (error) {
        console.error(`Error fetching user data with ID ${userId}:`, error);
      }
    };

    fetchUser();
  }, [userId]);

  // Check if user is null before trying to access its properties
  if (!user) {
    return <div>Loading...</div>;
  }

  // Formating the date
  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
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
          User Profile
        </Typography>
        {activities.find}

        <p>{`Name: ${user.username}`}</p>
        <p>{`Rank: ${user.rank}`}</p>
        <p>{`Member since: ${formatDate(user.createdAt)}`}</p>
      
 
        <div>
          {`Activities joined: `}
          <Grid container spacing={3} style={{marginTop:"30px"}}>
            {activities && activities.length > 0 ? (
              activities.map(activity => (
                <Grid item xs={1} sm={4} md={4} key={activity._id}>
                  <Card sx={{ maxWidth: 345, border:"1px solid #1976d2", padding:"18px", textAlign:'center', borderRadius: '5px' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {activity.name}
                      </Typography>
                      <Typography variant="body7" color="text.secondary">
                        {activity.description}
                      </Typography>
                      <Typography variant="body2" color="black">
                        {formatDate(activity.createdAt)}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {activity.rank}
                      </Typography>
                    </CardContent>
                    <CardActions style={{display:"flex", justifyContent:"center", color:'#725C3A'}}>
                      <Link key={activity?._id} to={`/activity/${activity?._id}`} style={{ textDecoration: 'none' }}>
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
        </div>
      </Container>

    </>
  );
};

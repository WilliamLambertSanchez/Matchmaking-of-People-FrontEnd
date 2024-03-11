import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import activityApi from "../api/activityApi";
import Header from "../components/Header";
import userApi from "../api/userApi";
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";

export const ActivityPage = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const responseActivity = await activityApi.getActivity(activityId);
        setActivity(responseActivity);

        // Fetch details of participants of the activity
        const usersDetails = await Promise.all(
          responseActivity.participants.map(async (userId) => {
            try {
              const user = await userApi.getUser(userId);
              return user;
            } catch (userError) {
              console.error(`Error fetching user with ID ${userId}:`, userError);
              return null;
            }
          })
        );

        setUsers(usersDetails);

      } catch (error) {
        console.error(`Error fetching activity with ID ${activityId}:`, error);
      }
    };

    fetchActivity();
  }, [activityId]);

  if (!activity) {
    return (
      <>
      <Header />
      <div>Loading...please Login again</div>
      </>
    )
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
          Activity Details
        </Typography>
        {users.find}

        <p>{`Author: `}
        <Link to={`/u/${activity.username}`}>
          {activity.username}
        </Link>
        </p>
        <p>{`Activity Name: ${activity.name}`}</p>
        <p>{`Description: ${activity.description}`}</p>
        <p>{`Date: ${formatDate(activity.date)}`}</p>
      
 
        <div>
          {`Participants : `}
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
        </div>
      </Container>
    </>
  );
};

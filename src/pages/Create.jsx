import axios from "axios"
import { useEffect, useState } from "react"
import { CreateActivityForm } from '../components/CreateActivity'
import activityApi from "../api/activityApi"
import Header from "../components/Header"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const Create = ({token}) => {

  const [activities, setActivities] = useState([]);
  const [refresh, toggle] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activityIdToUpdate, setActivityIdToUpdate] = useState('');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  
  const getActivities = async () => {
    try {
      const responseActivity = await activityApi.getActivity()
      console.log('response : ', responseActivity)
      setActivities(responseActivity)
    } catch (error) {
      console.error('Error fetching activity:', error)
    }}

  const deleteActivity = async (id) => {
    console.log('this is the id : ', id)
    await fetch(`${BASE_URL}/activities/${id}`, { method: 'DELETE' });
    toggle(!refresh);
  };

  const addActivity = async (name, description, date) => {
    await activityApi.createActivity(name, description, date, token);
    setName('');
    setDescription('');
    setDate('')
    toggle(!refresh);
  };

  const updateActivity = async () => {
    try {
      const updatedActivity = {
        name: name,
        description: description,
        date: date,
      };
  
      await axios.patch(`${BASE_URL}/activities/${activityIdToUpdate}`, updatedActivity);
      console.log('ID TO UPDATE : ', activityIdToUpdate)
      setIsUpdating(false);
      setActivityIdToUpdate(''); // Reset the id after updating
      setName('');
      setDescription('');
      setDate('');
      toggle(!refresh);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };
  

  useEffect(() => {
    getActivities();
  }, [refresh]);

  const updateMode = (_id, name, description, date) => {
    console.log('Updating mode : ', updateMode)
    setIsUpdating(true);
    setActivityIdToUpdate(_id);
    setName(name);
    setDescription(description);
    setDate(date)
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
  };

// Formating de date
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
      <h2>Create and Update your activities</h2>
      <CreateActivityForm
        addActivity={addActivity}
        updateActivity={updateActivity}
        isUpdating={isUpdating}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
      ></CreateActivityForm>
      <ul>
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <li key={activity._id}>
              <p>{`Name of activity : ${activity.name}`}</p>
              <p>{`Description of activity : ${activity.description}`}</p>
              <p>{`Date of activity : ${formatDate(activity.date)}`}</p>
              <p>{`Author of activity : ${activity.username}`}</p>
              <button onClick={() => deleteActivity(activity._id)}>Delete</button>
              <button onClick={() => updateMode(activity._id, activity.name, activity.description, activity.date)}>
                Update
              </button>
            </li>
          ))
          ) : (
          <div>Loading...</div>
        )}
      </ul>
    </>
  );
}

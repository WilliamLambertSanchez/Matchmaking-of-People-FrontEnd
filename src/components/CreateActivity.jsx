export const CreateActivityForm = ({
  addActivity,
  updateActivity,
  isUpdating,
  name,
  setName,
  description,
  setDescription,
  date,
  setDate,
}) => {


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdating) {
      updateActivity();
    } else {
      addActivity(name, description, date)
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div>
        <label>Name of the activity</label>
        <input
          type="text"
          placeholder="Name of the activity"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>

      <div>
        <label>Description of the activity</label>
        <input
          className="description-input"
          type="text"
          placeholder="Description of the activity"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </div>

      <div>
        <label>Date of the activity</label>
        <input
          className="date-input"
          type="datetime-local"
          placeholder="Date of the activity"
          value={date}
          onChange={(evt) => setDate(evt.target.value)}
          required pattern="\d{4}-\d{2}-\d{2}"
          min="2024-01-30"
          max="2024-12-31"
          data-date=""
          data-date-format="dd-mm-yyyy-HH:mm"
        />
      </div>

      <div>
        <input type="submit" value={isUpdating ? 'Update activity' : 'Add activity'} />
      </div>
    </form>
  )
}
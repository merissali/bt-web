import React from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import RadioGroupButtons from "components/buttons/RadioGroupButtons";

export default function MemberCreateForm(props) {
  const {
    initialValues,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    submitCount,
    dirty,
    isSubmitting,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const textFieldError = (id) => {
    return (errors[id] && submitCount > 0) || (touched[id] ? errors[id] : "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <Typography variant="caption" color={"error"}>
        * Indicates required field
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={initialValues.fname}
            label="First Name*"
            autoComplete="given-name"
            helperText={textFieldError("fname")}
            error={!!textFieldError("fname")}
            id="fname"
            onChange={change.bind(null, "fname")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={initialValues.lname}
            label="Last Name*"
            autoComplete="family-name"
            helperText={textFieldError("lname")}
            error={!!textFieldError("lname")}
            id="lname"
            onChange={change.bind(null, "lname")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            disabled={!!initialValues.email}
            defaultValue={initialValues.email}
            label="Email Address*"
            autoComplete="email"
            helperText={textFieldError("email")}
            error={!!textFieldError("email")}
            id="email"
            onChange={change.bind(null, "email")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Student Number*"
            helperText={textFieldError("id")}
            error={!!textFieldError("id")}
            id="id"
            onChange={change.bind(null, "id")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            defaultValue={initialValues.inviteCode}
            label="Membership Code"
            helperText={textFieldError("inviteCode")}
            error={!!textFieldError("inviteCode")}
            id="inviteCode"
            onChange={change.bind(null, "inviteCode")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "Arts",
              "Commerce",
              "Science",
              "Engineering",
              "Kinesiology",
              "Land and Food Systems",
              "Forestry",
            ]}
            groupName={"faculty"}
            displayName={"Faculty*"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={false}
            options={[
              "1st Year",
              "2nd Year",
              "3rd Year",
              "4th Year",
              "5+ Year",
            ]}
            groupName={"year"}
            displayName={"Level of study*"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={["None", "Vegetarian", "Vegan", "Gluten Free"]}
            groupName={"diet"}
            displayName={"Dietary restrictions*"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "He/Him/His",
              "She/Her/Hers",
              "They/Them/Their",
              "Prefer not to say",
            ]}
            groupName={"gender"}
            displayName={"Preferred Pronouns"}
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroupButtons
            {...props}
            otherOption={true}
            options={[
              "Facebook",
              "Boothing",
              "Friends",
              "BizTech Newsletter",
              "Faculty Newsletter",
              "Other",
            ]}
            groupName={"heardFrom"}
            displayName={"How did you hear about UBC BizTech?"}
          />
        </Grid>
      </Grid>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!dirty || isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}

import React, { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, Button, withStyles, CircularProgress } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import firebase from '../firebase'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
})

function Dashboard(props) {
  const [fruit, setFruit] = useState('')
  
  useEffect(() => {
    //getting firestore data
    firebase.getCurrentUserFruit().then(setFruit)
  }, [])

  if(!firebase.getCurrentUsername()) {
    // not logged in
    alert('Please login first')
    props.history.replace('/login')
    return null
  }

  const { classes } = props;

  async function logout() {
    await firebase.logout()
    //use for routing
    props.history.push('/')
  }

  return (
    <main className={classes.main}>
     <Paper className={classes.paper}>
       <Avatar className={classes.avatar}>
         <VerifiedUserOutlined />
       </Avatar>
       <Typography component="h1" variant="h5">
          Hello { firebase.getCurrentUsername() }
       </Typography>
       <Typography component="h1" variant="h5">
          Your favorite fruit: {fruit ? `"${fruit}"` : <CircularProgress size={20} />}
       </Typography>
       <Button type="submit" fullWidth variant="contained" color="secondary" onClick={logout} className={classes.submit}>
         Logout
       </Button>
     </Paper>
   </main> 
 )
}

export default withStyles(styles)(Dashboard)
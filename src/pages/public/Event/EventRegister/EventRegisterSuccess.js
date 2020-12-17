import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import LinkIcon from '@material-ui/icons/Link'
import FacebookIcon from '@material-ui/icons/Facebook'
import Discord from '../../../../components/icons/discord.svg'
import HouseChef from 'assets/housechef.svg'
import SpeechBubble from 'assets/registrationpagespeech.svg'

import { COLORS } from '../../../../constants/_constants/theme'

const ICON_SIZE = '24px';
const FLASH_TIME = '50';

const useStyles = makeStyles(theme => ({
  leftColumn: {
    //border: '1px solid yellow'
  },
  rightColumn: {
    //border: '1px solid orange',
    display: 'flex',
    flexDirection: 'column',
  },
  successMessageContainer: {
    marginTop: '70px',
    paddingLeft: '19px',
    marginLeft: '13px'
  },
  successMessageHeading: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  whereToNextContainer: { 
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '11px'
  },
  whereToNextHeading: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: '5px',
    verticalAlign: 'bottom',
  },
  linkIcon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: '5px',
    verticalAlign: 'bottom',
    '&:hover': {
      transform: 'rotate(-20deg)',
      cursor: 'pointer',
    },
    '&:active': {
      transform: 'rotate(-90deg)'
    },
  },
  linkCopiedMessageContainer: {
    paddingLeft: '19px',
    marginLeft: '13px',
  },
  linkCopiedMessage: {
    color: `${COLORS.LIGHT_YELLOW}`,
  },
  linkCopiedMessageHidden: {
    color: `${COLORS.LIGHT_YELLOW}`,
    visibility: 'hidden'
  },
  upcomingEventsContainer: {
    border: `1px solid #485A78`, 
    borderRadius: '5px',
    padding: '19px',
  },
  upcomingEventsHeading: {
    fontWeight: 'bold',
    fontSize: '20px'
  },
  upcomingEventsItem: {
    marginTop: '10px'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  houseChefImage: {
    width: '30%',
    marginLeft: '5%',
    [theme.breakpoints.between('sm', 'md')] : {
      width: '15%' //On small and medium screens, images need to be shrunk a bit
    }
  },
  speechBubble: {
    alignSelf: 'start',
    width: '55%',
    [theme.breakpoints.between('sm', 'md')] : {
      width: '27.5%' //On small and medium screens, images need to be shrunk a bit
    }
  }
}))

const EventRegisterSuccess = ({email, upcomingEvents, location}) => {
    const classes = useStyles();

    const [displayLinkMessage, setDisplayLinkMessage] = useState(false);

    let blinkingTimer = undefined;

    const copyLinkToClipboard = () => {
      navigator.clipboard.writeText(`https://app.ubcbiztech.com${location.pathname}`);
      if(blinkingTimer) clearTimeout(blinkingTimer);

      //Create blinking effect when link icon clicked multiple times, for better UX experience
      setDisplayLinkMessage(false); 
      blinkingTimer = setTimeout(() => setDisplayLinkMessage(true), FLASH_TIME);
    }

    return (
        <Grid container spacing={4} className={classes.main} >
          <Grid item xs={12} lg={7} className={classes.leftColumn}>
            <div className={classes.successMessageContainer}>
                <Typography className={classes.successMessageHeading}>See you soon!</Typography>
                <Typography>You've successfully registered with <b>{email}</b>.</Typography>
                <Typography>We've sent you an email!</Typography>
            </div>
            <div className={classes.whereToNextContainer}>
                <Typography className={classes.whereToNextHeading}>What's next?</Typography>
                <Typography>Share the event with friends! 
                    {/*TODO: Add clipboard icon to copy registration link to user's clipboard when clicked */}
                    <LinkIcon className={classes.linkIcon} 
                      onClick={() => copyLinkToClipboard()}
                    />
                    <a href='https://www.facebook.com/BizTechUBC/' target='_blank' rel='noopener noreferrer'>
                        <FacebookIcon className={classes.icon} />
                    </a>
                    <a href='https://discord.gg/tP6kbkmK5D' target='_blank' rel='noopener noreferrer'>
                        <img src={Discord} className={classes.icon} alt='Discord' />
                    </a>

                </Typography>
            </div>
            <div className={classes.linkCopiedMessageContainer}>
            {displayLinkMessage ?  
                <Typography className={classes.linkCopiedMessage} variant='caption'>
                  Registration Link Copied to Clipboard!</Typography> :
                <Typography className={classes.linkCopiedMessageHidden} variant='caption'>
                  Registration Link Copied to Clipboard!</Typography> 
            }
            </div>
          </Grid>
          <Grid item xs={12} lg={5} className={classes.rightColumn}>
              <div className={classes.imageContainer}>
                <img src={SpeechBubble} alt="Speech Bubble" className={classes.speechBubble}/>
                <img src={HouseChef} alt="House with Chef Hat" className={classes.houseChefImage}/>
              </div>
              {/* TODO: Put some upcoming events in here. */}
              <div className={classes.upcomingEventsContainer}>
                <Typography className={classes.upcomingEventsHeading}>Upcoming Events:</Typography>

                {upcomingEvents.map(event => {
                  const eventStart = event.startDate && new Date(event.startDate)
                        .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                  const eventEnd = event.endDate && new Date(event.endDate)
                        .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

                  return (
                  <div key={`${event.id};${event.year}`} className={classes.upcomingEventsItem}>
                    <Typography>{event.ename}</Typography>
                    <Typography variant='caption' >
                      {eventStart}
                      {(eventEnd && (eventEnd !== eventStart)) ? ` - ${eventEnd}` : ''}
                    </Typography>
                  </div>
                  )
                })}

              </div>
          </Grid>
        </Grid>
    )

}

export default withRouter(EventRegisterSuccess)
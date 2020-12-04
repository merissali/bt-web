import React from 'react'
import BiztechIcon from '../icons/BiztechIcon'
import { COLORS } from '../../constants/_constants/theme'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const ICON_SIZE = '28px'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop: '15px'
  },
  biztechText: {
    marginLeft: '14px',
    verticalAlign: 'middle',
    fontSize: '20px'
  }
}))

function Header () {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <BiztechIcon fill={COLORS.WHITE} size={ICON_SIZE} />
      <Typography className={classes.biztechText}>ubc biztech</Typography>
    </div>
  )
}

export default Header

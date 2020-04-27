import { makeStyles } from "@material-ui/core"
import colors from "../utils/colors"

export const mainLayoutStyles = makeStyles({
  // container: {
  //   backgroundColor: colors.black,
  //   maxWidth: 1200,
  //   margin: '0 auto',
  // },
  col: {
    height: '100vh',
    overflowY: 'auto',
  },
  mainGrid: {
    backgroundColor: colors.contentGrey,
    color: '#cecece',
    position: 'relative'
  },
  leftGrid: {
    paddingTop: 15,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.black,
  },
})
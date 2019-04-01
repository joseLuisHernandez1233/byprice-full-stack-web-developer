import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 * Estilos del Componente
 * @returns {Object} - Objeto con las clases a usar.
 */
const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    margin: 8,
    width: '50%'
  },
  grid: {
    width: '100%',
    padding: '10px',
  },
  deleteIcon: {
    cursor: 'pointer',
    color: 'red'
  }
});

class SentenceContainerComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      text: ''
    }
  }

  /**
   * Método que actualiza el estado del input.
   */
  handleOnChange = (value, prop) => {
    this.setState({
      ...this.state,
      [prop]: value
    })
  }

  /**
   * Método que lista los enunciados.
   * @returns {Jsx|String} - Item List contenedoras de cada enunciado.
   */
  renderList = () => {
    const { list } = this.state;
    const { classes } = this.props;

    if (list.length === 0)
      return 'Sin Elementos.';

    return list.map((element, idx) => {
      return (
        <ListItem>
          <ListItemText
            primary={element}
          />
          <ListItemIcon>
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={e => this.deleteElement(idx)}
            />
          </ListItemIcon>
        </ListItem>
      )
    })
  }

  /**
   * Método que agrega un nuevo enunciado.
   */
  addElement = () => {
    const { list, text } = this.state
    this.setState(
      { list: [...list, text.trim()] },
      () => this.setState({ text: '' })
    )
  }

  /**
   * Método que elimina un enunciado.
   */
  deleteElement = (index) => {
    this.setState({
      list: this.state.list.filter((ele, idx) => idx !== index)
    })
  }

  render() {
    let { text } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Input
              className={classes.input}
              id="standard-full-width"
              label="Label"
              placeholder="Introduzca su enunciado."
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={text}
              onChange={e => this.handleOnChange(e.target.value, 'text')}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={e => this.addElement()}
            >
              Add
              </Button>
            <Paper className={classes.paper}>
              <Grid
                item xs={24}
                className={classes.grid}
              >
                <Typography variant="h4">
                  Enunciados
                </Typography>
                <List>
                  {this.renderList()}
                </List>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SentenceContainerComponent);

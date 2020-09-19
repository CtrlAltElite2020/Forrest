import Box from '@material-ui/core/Box';
import React, { useContext, useState } from 'react';
import {
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import TextEntry from '../General/Entry/TextEntry';
import axios from '../../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';
import STATE from '../../context/state';
import { setLoading, clearLoading } from '../../context/loading';
import TextEntryValued from "../General/Entry/FilledTextEntry";

interface Props {
  logo: any;
  text: string;
  width: number;
  height: number;
  imgHeight: number;
  backgroundColor: string;
  defaultInput: string;
}

const SocialMediaBar: React.FC<Props> = ({
  logo,
  text,
  width,
  height,
  imgHeight,
    backgroundColor,
    defaultInput
}) => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState<any>(defaultInput ? defaultInput : '');
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios
      .put('/api/user/update/social-media', { provider: text, username: input })
      .then((res: AxiosResponse) => {
        setLoading(dispatch);
        dispatch({ type: STATE.SET_USER, payload: res.data });
        clearLoading(dispatch);
        setOpen(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
  const handleClear = () => {
    axios
        .put('/api/user/update/social-media', { provider: text, username: null })
        .then((res: AxiosResponse) => {
          setLoading(dispatch);
          dispatch({ type: STATE.SET_USER, payload: res.data });
          clearLoading(dispatch);
          setOpen(false);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
  };
  console.log(state.user)
  return (
    <Box
      boxShadow={4}
      border={2}
      borderColor={backgroundColor=='default' ? 'background.paper' : backgroundColor}
      m={1}
      p={0}
      height={height}
      width={width}
      borderRadius={18}
      className={'hover'}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>{text}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your username below
          </DialogContentText>
          <Box width={'250px'}>
            <TextEntryValued
              onChange={e => setInput(e.target.value)}
              helperText={'Enter your username here'}
              label={text}
              required={true}
              fullWidth={true}
              error={false}
              innerStr={input}
              small={false}
              name={text}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleClear} color='secondary'>
            Remove
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        onClick={handleClickOpen}
      >
        <Box marginRight={1} marginTop={2}>
          <img height={imgHeight} width={imgHeight} src={logo} alt={text} />
        </Box>
        <Box marginTop={1.5}>
          <Typography variant='body2'>{text}</Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default SocialMediaBar;

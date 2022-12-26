import React from 'react';
import Badge from '@mui/material/Badge';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import { useAppSelector } from '../../store/hooks';
import { selectNotes } from '../../store/modules/NotesSlice';

const NotesCounter: React.FC = () => {
  const notesRedux = useAppSelector(selectNotes);
  const loginRedux = useAppSelector(state => state.login);
  const userLogged = loginRedux.userList.find(user => user.logged);
  const userNote = notesRedux.filter(note => note.user === userLogged?.email);

  return (
    <Badge badgeContent={userNote.length} color="secondary">
      <FormatListNumberedRtlIcon />
    </Badge>
  );
};
export default NotesCounter;

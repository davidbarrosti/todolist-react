import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useState } from 'react';
import { NoteType } from '../../types';
import { deleteNote, updateNote } from '../../store/modules/NotesSlice';
import {  useAppDispatch } from '../../store/hooks';

interface ItemNoteProps {
  note: NoteType;
}

const ItemNote: React.FC<ItemNoteProps> = ({ note }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [editDetail, setDetail] = useState<string>('');
  const [IdDetail, setIdDetail] = useState<number>(0);
  const [editDescription, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleDeleteNote = () => { 
    dispatch(deleteNote(IdDetail));
    setOpenDelete(false);
    alert('Tarefa Deletada!');
  };

  const openEditModal = useCallback((note: NoteType) => {
    setOpenEdit(true);
    setDetail(note.detail);
    setDescription(note.description);
  }, []);

  const openDeleteModal = (note: NoteType) => {
    setIdDetail(note.id);
    setDetail(note.detail);
    setDescription(note.description);
    setOpenDelete(true);
  };

  const handleEditNote = () => {
    if (!editDetail || editDetail.length < 3) {
      alert('Titulo inválido! \nPreencha com pelo menos 3 caractéres');
      return;
    }
    if (!editDescription || editDescription.length < 3) {
      alert('Descrição inválida! \nPreencha com pelo menos 3 caractéres');
      return;
    }
    dispatch(
      updateNote({
        id: note.id,
        changes: {
          detail: editDetail,
          description: editDescription
        }
      })
    );
    alert('Tarefa Alterada!');
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton onClick={() => openEditModal(note)} edge="end" aria-label="edit" sx={{ paddingRight: '20px' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => openDeleteModal(note)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={note.detail} secondary={note.description} />
      </ListItem>
      <Divider variant="inset" />
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Atenção<br></br>Você ira editar sua Tarefa!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="detalhe"
            label="Titulo"
            type="text"
            value={editDetail || ''}
            onChange={ev => setDetail(ev.target.value)}
            inputProps={{ maxLength: 200 }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            value={editDescription || ''}
            onChange={ev => setDescription(ev.target.value)}
            inputProps={{ maxLength: 300 }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => handleEditNote()}>
            Alterar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Atenção<br></br>Você ira Deletar sua Tarefa!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="detalhe"
            label="Titulo"
            type="text"
            disabled = {true}
            value={editDetail || ''}
            onChange={ev => setDetail(ev.target.value)}
            inputProps={{ maxLength: 200 }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            disabled = {true}
            type="text"
            value={editDescription || ''}
            onChange={ev => setDescription(ev.target.value)}
            inputProps={{ maxLength: 300 }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleDeleteNote}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ItemNote;

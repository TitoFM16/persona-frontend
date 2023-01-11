import React ,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Modal } from '@mui/material/';
import { openViewDialog, openEditDialog, openDeleteDialog } from '../redux/slices/personasSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

function PersonasTable({personas}) {
    
    const dispatch = useDispatch();

    const handleViewClick = (persona) => {
        setOpen(true);
        dispatch(openViewDialog(persona));
    }
    const handleClose = () => setOpen(false);
    
    const handleEditClick = (persona) => {
        dispatch(openEditDialog(persona));
    }
    const handleDeleteClick = (persona) => {
        dispatch(openDeleteDialog(persona));
    }
    const [open, setOpen] = useState(false);
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tipo documento</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Hobbie</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {personas.personas.map((persona) => (
                    <TableRow key={persona.id}>
                        <TableCell>{persona.tipo_documento}</TableCell>
                        <TableCell>{persona.documento}</TableCell>
                        <TableCell>{persona.nombres}</TableCell>
                        <TableCell>{persona.apellidos}</TableCell>
                        <TableCell>{persona.hobbies}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={() => handleViewClick(persona)}>View</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleEditClick(persona)}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(persona)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </Paper>
        
    );
};


export default PersonasTable;

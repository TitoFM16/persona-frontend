import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { Box, Button, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Typography, Select,Paper, Modal,FormControl, InputLabel, Input, FormHelperText, } from '@mui/material/';
import { createPersona,updatePersona, deletePersona } from '../redux/actions/personasActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const styleModals = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

function PersonasTable({personas}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State hooks to handle open/close of create, edit and delete modals
    const [openAdd    , setOpenAdd]    = useState(false);
    const [openEdit   , setOpenEdit]   = useState(false);
    const [openDelete , setOpenDelete] = useState(false);
    
    // Sate hook to handle selected persona
    const [selectedPersona, setSelectedPersona] = useState({});

    // State hooks to handle ADD data to create persona
    const [tipo_documentoAdd , setAddTipoDocumento] = useState("");
    const [documentoAdd      , setAddDocumento]     = useState("");
    const [nombresAdd        , setAddNombres]       = useState("");
    const [apellidosAdd      , setAddApellidos]     = useState("");
    const [hobbiesAdd        , setAddHobbies]       = useState("");

    // State hooks to handle edit data to update persona
    const [tipo_documentoEdit, setEditTipoDocumento] = useState(selectedPersona.tipo_documento || "");
    const [documentoEdit     , setEditDocumento]     = useState(selectedPersona.documento || "");
    const [nombresEdit       , setEditNombres]       = useState(selectedPersona.nombres || "");
    const [apellidosEdit     , setEditApellidos]     = useState(selectedPersona.apellidos || "");
    const [hobbiesEdit       , setEditHobbies]       = useState(selectedPersona.hobbies || "");

    const handleAddClick    = () => {

        setOpenAdd(true)
    }

    const handleAddSubmit = (tipo_documentoAdd, documentoAdd, nombresAdd, apellidosAdd, hobbiesAdd) =>{
        let persona_add={
            tipo_documento : tipo_documentoAdd,
            documento      : documentoAdd,
            nombres        : nombresAdd,
            apellidos      : apellidosAdd,
            hobbies        : hobbiesAdd
        }
        dispatch(createPersona(persona_add))
        alert(`Persona creada${JSON.stringify(persona_add)}`)
        setOpenAdd(false)
        navigate("/");
    }

    const handleCloseAdd   = () => setOpenAdd(false);

    const handleViewClick = (persona) => {
        navigate(`/persona/${persona.id}`)
    }
    
    const handleEditClick = (persona) => {
        setSelectedPersona(persona);

        setEditTipoDocumento(persona.tipo_documento);
        setEditDocumento(persona.documento);
        setEditNombres(persona.nombres);
        setEditApellidos(persona.apellidos);
        setEditHobbies(persona.hobbies);

        setOpenEdit(true);
    }

    const handleCloseEdit   = () => setOpenEdit(false);
    
    
    const handleEditSubmit = (tipo_documentoEdit, documentoEdit, nombresEdit, apellidosEdit, hobbiesEdit) =>{
        let persona_edit={
            tipo_documento : tipo_documentoEdit,
            documento      : documentoEdit,
            nombres        : nombresEdit,
            apellidos      : apellidosEdit,
            hobbies        : hobbiesEdit
        }
        dispatch(updatePersona(persona_edit,selectedPersona.id))
        alert(`Persona editada${JSON.stringify(persona_edit)}`);
        setOpenEdit(false);
        navigate("/");
    }

    const handleDeleteClick = (persona) => {
        setSelectedPersona(persona);
        setOpenDelete(true);    
    }

    const handleDeleteSubmit = (persona) =>{
        dispatch(deletePersona(persona.id));
        alert(`Persona eliminada${JSON.stringify(persona)}`);
        setOpenDelete(false)
        navigate("/");
    }
    const handleCloseDelete = () => setOpenDelete(false);



    
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
                        <TableCell>
                            <Button variant="contained" style={{  backgroundColor:"#00913f" ,  margin:"15px"}}  onClick={() => handleAddClick()}>Agregar persona <AddCircleIcon/></Button>
                        </TableCell>
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
                            <Button variant="contained" style={{  backgroundColor: "#00913f", marginLeft:"5px"}} onClick={() => handleEditClick(persona)}>Edit</Button>
                            <Button variant="contained" style={{  backgroundColor: "#FF0000", marginLeft:"5px"}} onClick={() => handleDeleteClick(persona)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            {/* Add Modal */}
            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={styleModals}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Persona
                    </Typography>
               
                    <form>
                    <Typography id="mod0al-modal-description" sx={{ mt: 4 }}>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="tipo_documento">Tipo Documento</InputLabel>
                            <Select
                                labelId="tipo_documento"
                                
                                value={tipo_documentoAdd}
                                label="Age"
                                onChange={(e) => setAddTipoDocumento(e.target.value)}
                            >
                                <MenuItem value={"CC"}>CC</MenuItem>
                                <MenuItem value={"TI"}>TI</MenuItem>
                                <MenuItem value={"CE"}>CE</MenuItem>
                            </Select>
                            {/* <Input id="tipo_documento" value={tipo_documentoAdd} onChange={(e) => setAddTipoDocumento(e.target.value)} /> */}
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="documento">Documento</InputLabel>
                            <Input id="documento" value={documentoAdd} onChange={(e) => setAddDocumento(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="nombres">Nombres</InputLabel>
                            <Input id="nombres" value={nombresAdd} onChange={(e) => setAddNombres(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
                            <Input id="apellidos" value={apellidosAdd} onChange={(e) => setAddApellidos(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="hobbies">Hobbies</InputLabel>
                            <Input id="hobbies" value={hobbiesAdd} onChange={(e) => setAddHobbies(e.target.value)} />
                        </FormControl>
                    </Box>
                        <Button variant="contained" color="primary" onClick={() => handleAddSubmit(tipo_documentoAdd, documentoAdd, nombresAdd, apellidosAdd, hobbiesAdd )}>Añadir</Button>
                        <Button variant="contained" style={{  backgroundColor: "#FF0000"}} onClick={handleCloseAdd}>Cancel</Button>
                    </Typography>
                    </form>
                    
                </Box>
            </Modal>

            {/* Edit Modal */}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={styleModals}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Persona
                    </Typography>
               
                    <form>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="tipo_documento">Tipo Documento</InputLabel>
                            <Select
                                labelId="tipo_documento"
                                
                                value={tipo_documentoEdit}
                                label="Age"
                                onChange={(e) => setEditTipoDocumento(e.target.value)}
                            >
                                <MenuItem value={"CC"}>CC</MenuItem>
                                <MenuItem value={"TI"}>TI</MenuItem>
                                <MenuItem value={"CE"}>CE</MenuItem>
                            </Select>
                            {/* <Input id="tipo_documento" value={tipo_documentoEdit} onChange={(e) => setEditTipoDocumento(e.target.value)} /> */}
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="documento">Documento</InputLabel>
                            <Input id="documento" value={documentoEdit} onChange={(e) => setEditDocumento(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="nombres">Nombres</InputLabel>
                            <Input id="nombres" value={nombresEdit} onChange={(e) => setEditNombres(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
                            <Input id="apellidos" value={apellidosEdit} onChange={(e) => setEditApellidos(e.target.value)} />
                        </FormControl>
                    </Box>
                    <Box  my={2}>
                        <FormControl>
                            <InputLabel htmlFor="hobbies">Hobbies</InputLabel>
                            <Input id="hobbies" value={hobbiesEdit} onChange={(e) => setEditHobbies(e.target.value)} />
                        </FormControl>
                    </Box>
                        <Button variant="contained" color="primary" onClick={() => handleEditSubmit(tipo_documentoEdit, documentoEdit, nombresEdit, apellidosEdit, hobbiesEdit )}>Editar</Button>
                        <Button variant="contained" style={{  backgroundColor: "#FF0000"}} onClick={handleCloseEdit}>Cancel</Button>
                    </Typography>
                    </form>
                    
                </Box>
            </Modal>
            {/* Delete Modal */}
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={styleModals}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    ¿Seguro Quieres Eliminar la persona?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button variant="contained" 
                                    style={{
                                        backgroundColor: "#FF0000",
                                    
                                    }}
                                    onClick={() => handleDeleteSubmit(selectedPersona)}
                            >Eliminar</Button>
                            <Button variant="contained"
                            onClick={handleCloseDelete}
                            >Cancelar</Button>
                    </Typography>
                </Box>
            </Modal>
        </Paper>
        
    );
};


export default PersonasTable;

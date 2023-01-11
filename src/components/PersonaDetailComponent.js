import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Modal } from '@mui/material/';
function RenderPersona({persona}){
 
  if (persona != null){

    return(
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
                    
                    <TableRow key={persona.id}>
                        <TableCell>{persona.tipo_documento}</TableCell>
                        <TableCell>{persona.documento}</TableCell>
                        <TableCell>{persona.nombres}</TableCell>
                        <TableCell>{persona.apellidos}</TableCell>
                        <TableCell>{persona.hobbies}</TableCell>
                        {/* <TableCell>
                            <Button variant="contained" color="primary" onClick={() => handleViewClick(persona)}>View</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleEditClick(persona)}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(persona)}>Delete</Button>
                        </TableCell> */}
                    </TableRow>
             
                </TableBody>
            </Table>

        </Paper>
    );
  }
  else{
    return(
      // redirects user to /vitrina route
      <div>
        <h3>No se encontro el personaro</h3>
      </div>
      );
        }
}


const PersonaDetailComponents = (props)=> {
    const [persona, setPersona] = useState(props.persona)
    let params = useParams();
  
    async function getPersona(){
      await axios.get(baseUrl+'api/personas/'+params.personaId+'/')
      .then((response) => {         
          setPersona(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    }
  
    useEffect(() => {
        if(!props.persona){
            getPersona()
        }
    },[props.persona])

      return ( 
        <RenderPersona persona={props.persona===undefined? persona: props.persona}/>               
      );

}


export default PersonaDetailComponents;



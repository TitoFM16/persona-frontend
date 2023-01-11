import React, { useEffect } from 'react';
import {Routes, Route, Navigate, useParams} from 'react-router-dom'; //Switch changed to routes Also redirect is changed to Navigate since version 6

// import Footer from './FooterComponent';
// import Header from './HeaderComponent';
import Header from './HeaderComponent';
import PersonasTable from './PersonasTable';
import PersonaDetailComponent from './PersonaDetailComponent';

import {useDispatch, useSelector} from 'react-redux';
import { fetchPersonas } from '../redux/actions/personasActions';

function Main(){
   
    const personas = useSelector(state => state.personas);

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchPersonas());

    }, []);

    const PersonaWithId = () => {
        let params = useParams();
        
        return(
            <PersonaDetailComponent persona={personas.length===0 ?  null :personas.personas.filter((persona) => persona.id === params.personaId)[0]}/>
        );
    };
  return (  
    
    <div>
      {/* <Header/>   */}
        <Header/>
        <Routes>
            <Route path = "/"                   element={<PersonasTable personas={personas} />}/> 
            <Route path = "/persona/:personaId" element={<PersonaWithId/>} />
            <Route path = "*"                   element={<Navigate to="/" />} />
            {/* Instead of redirect the above is needed to redirect if there is no matched url*/}
        </Routes>
      {/* <Footer/> */}
    </div>
  );

};



export default Main;

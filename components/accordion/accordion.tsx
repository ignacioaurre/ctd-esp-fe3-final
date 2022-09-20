import React, {FC} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link'

type Items = {
  resourceURI: string,
  name: string,
}

type Characters = {
  available: number,
  collectionURI: string,
  items: Items[] ,
  returned: number,
}

type AccordionProps = {
    id: number,
    title: string,
    description?: string,
    characters?: Characters,
}

const AccordionComponent: FC<AccordionProps> = ({id, title, description , characters}: AccordionProps) => {
  
  const descriptionMsg = description === '' || null ? "No hay descripción" : description;
  const charactersMsg = "No hay personajes para este comic";

  const urlNormalizer = (url: String) => {
    const newUrl = url?.split("/").slice(-1)[0];
    const baseUrl = url?.split("/").slice(-2)[0] == "characters" ? "personajes" : "comic"
    return `/${baseUrl}/${newUrl}`
  }
  
  return (
    <Accordion key={id}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: "whitesmoke"}}>
        {!characters ?  <Typography>{descriptionMsg}</Typography>
        : characters.available > 0 ? (
          characters.items.map(char => <Link href={urlNormalizer(char.resourceURI)} key={char.name} style={{display: "block"}}><p style={{cursor: 'pointer'}}>{char.name}</p></Link>)
        ): <Typography>{charactersMsg}</Typography>}
        </AccordionDetails>
    </Accordion>
  )
}

export default AccordionComponent;
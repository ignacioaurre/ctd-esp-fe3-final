import React, {FC} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Items = {
  resourseURI: string,
  name: string,
}

type Characters = {
  available: 17,
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

const AccordionComponent: FC<AccordionProps> = ({id, title, description = "No hay descripción", characters}: AccordionProps) => {
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
        {description && <Typography>{description}</Typography>}
        {characters &&  (
          characters.items.map(char => <Typography key={char.name}>{char.name}</Typography>)
        )}
        </AccordionDetails>
    </Accordion>
  )
}

export default AccordionComponent;
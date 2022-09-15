import React, { FC } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

interface Data {
  id: number,
  question: string,
  answer: string,
}

type faqsProps = {
  faqs: Data[],
}

const Faqs: NextPage<faqsProps> = ( { faqs }: faqsProps ) => {
  return (
    <>
            <Head>
                <title>Preguntas Frecuentes</title>
                <meta name="faqs" content="Preguntas Frecuentes"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Preguntas Frecuentes"}>
              {faqs.map((faq: Data) => 
                <Accordion key={faq.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{backgroundColor: "whitesmoke"}}>
                    <Typography>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                )}
            </BodySingle>
        </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "http://localhost:3000/api/faqs"
    );
    const faqs: Data[] = await response.json();
    return {
      props:  { faqs } ,
    };
}

export default Faqs;
import React, { FC } from 'react'
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import {faqs, faq} from 'dh-marvel/features/faqs';

type faqsProps = {
  faqs: faq[],
}

const Faqs: NextPage<faqsProps> = ( { faqs }: faqsProps ) => {
  return (
    <LayoutGeneral>
            <Head>
                <title>Preguntas Frecuentes</title>
                <meta name="faqs" content="Preguntas Frecuentes"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Preguntas Frecuentes"}>
              {faqs.map((faq: faq) => 
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
        </LayoutGeneral>
  )
}


export const getStaticProps: GetStaticProps = async () => {
    return {
      props:  { faqs } ,
    };
}

export default Faqs;
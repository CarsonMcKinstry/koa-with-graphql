import { generateTypeScriptTypes } from 'graphql-schema-typescript';

import { importSchema } from 'graphql-import';


const schema = importSchema('./src/schema.graphql');

const outPath = './src/schema.d.ts';

generateTypeScriptTypes(schema, outPath, undefined)
    .then(() => {
        console.log(schema);
        console.log('DONE');
        process.exit(0);
    })
    .catch(err =>{
        console.error(err);
        process.exit(1);
    });
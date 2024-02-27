import React from 'react';
import { Items } from './items';
import { Empty } from 'pragmate-ui/empty';

export function Attachments({removeFile, items}): JSX.Element {

    const output = !items.length ? <Empty text="No hay archivos adjuntos" icon="file" /> : <div className='list-attachments'><Items removeFile={removeFile} items={items} /></div>;
    
    return (
        <div className='attachments'>
            <h3 className='title-attachment'>Adjuntos</h3>
            {output}
        </div>
    );
}

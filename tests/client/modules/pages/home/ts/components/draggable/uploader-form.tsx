import React from 'react'
import { Alert, ITypes } from 'pragmate-ui/alert';
import { Button } from 'pragmate-ui/components';
import { useUploader } from './use-uploader';
import { Icon } from 'pragmate-ui/icons';
import { iconDrap } from './icons';
import { Attachments } from './attachments';
import { LoaderDraggable } from './loader';

export function UploaderForm(): JSX.Element {

    const {error, loading, detailsError, success, onSubmit, ref, draggable, items, removeFile } = useUploader();       

    const filesNames =  !items.length ? '' : items.map((item, index) => (
        <span key={index} className='list-names--files'>{item.name}</span>
    ));

    return (    
        <>
            <div className="form-uploader">
                    <h3>Agregar archivos</h3>
                    <section ref={draggable} className="input-button">
                        {loading ? (
                            <LoaderDraggable />
                            ) : (
                            <>
                                <Icon {...iconDrap} />
                                <div className="input-button__file">
                                    <div className="content-action">
                                        <Button variant="primary" className='expand' ref={ref}>Elija un archivo</Button>
                                        <span>
                                            o arrástrelo hasta aquí
                                        </span>
                                    </div>
                                    {filesNames }
                                </div>
                            </>
                        )}
                    </section>
                    <Alert type={ITypes.Info}>
                        <h4 className="alert__title-span">
                            Extensiones de archivos permitidas: .xls;.xlsx;.doc;.docx;.pdf;.jpg;.bmp;.png;.gif;.jpeg. <br />
                            Tamaño total permitido de archivos: 976,56 KB'
                        </h4>
                    </Alert>
                    {success && <Alert closable type={ITypes.Success}>
                        <h4 className="alert__title-span">
                            {success}
                        </h4>
                    </Alert>}
                    {error && <Alert closable type={ITypes.Error}>
                        <h4 className="alert__title-span">
                            {error}
                        </h4>
                    </Alert>}
                    {detailsError && <Alert closable type={ITypes.Error}>
                        <h4 className="alert__title-span">
                            {detailsError}
                        </h4>
                    </Alert>}
                <footer className="footer-file">
                    <Button variant="primary" disabled={!items.length} type="button" onClick={onSubmit}>
                        Enviar
                    </Button>
                </footer>
            </div>
            <Attachments removeFile={removeFile} items={items} />
        </>
    );
}

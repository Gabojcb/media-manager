import React from "react";
import { Uploader } from 'tests-client/uploader';

export function useUploader() {
    const ref = React.useRef(null);
    const draggable = React.useRef(null);

    const [uploader, setUploader] = React.useState<Uploader | null>(null);
    const [success, setSuccess] = React.useState<undefined | string>();
    const [error, setError] = React.useState<undefined | string>();
    const [detailsError, setDetailsError] = React.useState<undefined | string>();
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if(!ref?.current) return;
        const instance = new Uploader({
            name: 'images',
			url: 'http://localhost:5000/images/upload',
			multiple: true,
        });
        globalThis.up = instance;
        setUploader(instance);
        instance.create(ref.current, draggable.current);

        const onChange = () => {
            setItems(instance?.files?.entries);
        }
        instance.on('items.loaded', onChange);
        instance.on('item.delete', onChange);

        return () => {
            instance.off('items.loaded', onChange);
            instance.off('item.delete', onChange);  
        } 
    }, [ref]);
     
    const onSubmit = async () => {
        if (!uploader) return;

        const maxSizeKB = 976.56;
        let invalidFiles = [];
        const allowedExtensions = ['.xls', '.xlsx', '.doc', '.docx', '.pdf', '.jpg', '.bmp', '.png', '.gif', '.jpeg'];
        for (const item of items) {
            const fileSizeKB = item.size / 1024;

            if (fileSizeKB > maxSizeKB || !uploader?.files.validateExtension(item, allowedExtensions)) {
                invalidFiles.push(item.name);
            }
        }

        if (invalidFiles.length > 0) {
            const invalidFileNames = invalidFiles.join(', ');
            setError(`Los siguientes archivos son inválidos: ${invalidFileNames}`);
            setDetailsError('La extensión del archivo es inválida o el tamaño del archivo excede el permitido');
            return;
        }

        try {
            setLoading(true);
            await uploader.publish({
                folder: 'beyondjs'
            });
            setSuccess('Archivos publicados correctamente.');
            uploader.clean();
        } catch (error) {
            console.error(`Error al publicar archivos: ${error}`);
        } finally {
            setLoading(false);
        }
        
    }
    
    const removeFile = (fileName: string) => {
        uploader.delete(fileName);
    }


    return {
        ready: !!uploader,
        uploader: uploader,
        onSubmit: onSubmit,
        ref: ref, 
        draggable: draggable,
        error: error,
        items: items,
        removeFile: removeFile,
        detailsError: detailsError,
        loading: loading,
        success: success
    };
}

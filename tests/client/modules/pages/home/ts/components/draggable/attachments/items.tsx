import React from 'react';
import { ImageConfig } from './image-config';

export function Items({removeFile, items}) {

    function bytesToKB(bytes: number) {
        return (bytes / 1024).toFixed(2);
    }

	const remove = (event) => {
		const { name } = event.target.dataset;
		removeFile(name);		
	}
    const preview: JSX.Element[] = items.map(
		(item): JSX.Element => (
			<div key={item.name} className="drop-file-preview__item">
				<div className="content-header">
					<img src={ImageConfig['default']} alt="" />
					<span data-name={item.name} onClick={remove} className="drop-file-preview__item__del">
						x
					</span>
				</div>
				<div className="drop-file-preview__item__info">
					<strong>{item.name}</strong>
					<p>{bytesToKB(item.size)}KB</p>
				</div>
			</div>
		)
	);
    return <>{preview}</>;
}

import React from "react";

export function Steps() {
    return (
        <section>
            <h2>Uploader</h2>
			<p>El caso de uso de genera cuando cargamos uno o mas archivos (ya sea draggable o con el boton) y le damos al boton enviar, despues de hacerlo si intentamos darle al boton <strong>Elija un archivo </strong>
			No volvera a abrir el evento de drap.
			</p>
			<br />
			<p>El uploader que se utiliza en SGS esta en: </p>
			 <strong>tests\client\modules\uploader-sgs</strong>
			<p>Y el componente Draggable hecho esta en :</p>
			<strong>tests\client\modules\pages\home\ts\components\draggable</strong>
			<br />
        </section>
    )
}
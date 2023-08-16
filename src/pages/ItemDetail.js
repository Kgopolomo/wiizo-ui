import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetail(props) {

    let params = useParams();

    return (
        <div>
            <p>Item detail : {params.id}</p>
        </div>
    );
}

export default ItemDetail;
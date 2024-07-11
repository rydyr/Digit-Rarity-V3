import React from "react";
import './owner.css';

export default function Owner(props) {
    
    const ensName = `https://vision.io/name/ens/${props.name}.eth`;

    return(
        <div className="ownerArea"  >
            <p id="ownerTag">Owner: {props.owner ? props.owner : 'Nothing Found'}</p>
            <a href={ensName} target="_blank" rel="noopener noreferrer" id="vLink">
                <span className="colorBlack">BIN</span>
                <span className="colorBlack">~ </span>
                <span className="colorYellow">Vision</span>
                <span className="colorBlack">.</span>
                <span className="colorYellow">io</span>
                <span className="colorBlack"> ~</span>
                <span className="colorBlack">M/O</span>
            </a>
            
        </div>
    )
}
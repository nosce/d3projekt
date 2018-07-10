import React from 'react'
import './App.css'

function UploadMessage(props) {
    const fileUploaded = props.fileUploaded;
    const inputField = props.inputField;
    const fileName = props.fileName;
    if (!fileUploaded) {
        return (
            <label htmlFor={inputField}>
                <svg viewBox="0 0 60 60">
                    <path d="M37,22H12c-0.552,0-1,0.448-1,1s0.448,1,1,1h25c0.552,0,1-0.448,1-1S37.552,22,37,22z"/>
                    <path d="M12,16h10c0.552,0,1-0.448,1-1s-0.448-1-1-1H12c-0.552,0-1,0.448-1,1S11.448,16,12,16z"/>
                    <path
                        d="M38,31c0-0.552-0.448-1-1-1H12c-0.552,0-1,0.448-1,1s0.448,1,1,1h25C37.552,32,38,31.552,38,31z"/>
                    <path
                        d="M30,39c0-0.552-0.448-1-1-1H12c-0.552,0-1,0.448-1,1s0.448,1,1,1h17C29.552,40,30,39.552,30,39z"/>
                    <path d="M12,46c-0.552,0-1,0.448-1,1s0.448,1,1,1h14c0.552,0,1-0.448,1-1s-0.448-1-1-1H12z"/>
                    <path d="M3,2h29v14h14v17h2V14.586L33.414,0H1v60h31v-2H3V2z M34,3.414L44.586,14H34V3.414z"/>
                    <path
                        d="M35,36v24h24V36H35z M57,58h-9V45.414l4.293,4.293l1.414-1.414L47,41.586l-6.707,6.707l1.414,1.414L46,45.414V58h-9V38h20V58z"/>
                </svg>
                <span className="filebox_message">
                    <strong>Choose an html-file</strong><br/>
                    <span className="filebox_dragndrop">or drag it here</span>.
                </span>
            </label>
        );
    }
    return (
        <div className="filebox_filename">
            <svg viewBox="0 0 60 60">
                <path d="M50.949,12.187l-1.361-1.361l-9.504-9.505c-0.001-0.001-0.001-0.001-0.001-0.001l-0.771-0.771
                C38.957,0.195,38.486,0,37.985,0H8.963C7.776,0,6.5,0.916,6.5,2.926V39v16.537V56c0,0.837,0.841,1.652,1.836,1.909
                c0.051,0.014,0.1,0.033,0.152,0.043C8.644,57.983,8.803,58,8.963,58h40.074c0.16,0,0.319-0.017,0.475-0.048
                c0.052-0.01,0.101-0.029,0.152-0.043C50.659,57.652,51.5,56.837,51.5,56v-0.463V39V13.978C51.5,13.211,51.407,12.644,50.949,12.187
                z M39.5,3.565L47.935,12H39.5V3.565z M8.963,56c-0.071,0-0.135-0.025-0.198-0.049C8.61,55.877,8.5,55.721,8.5,55.537V41h41v14.537
                c0,0.184-0.11,0.34-0.265,0.414C49.172,55.975,49.108,56,49.037,56H8.963z M8.5,39V2.926C8.5,2.709,8.533,2,8.963,2h28.595
                C37.525,2.126,37.5,2.256,37.5,2.391V14h11.608c0.135,0,0.265-0.025,0.391-0.058c0,0.015,0.001,0.021,0.001,0.036V39H8.5z"/>
                <polygon points="16.814,48.34 12.453,48.34 12.453,43.924 10.785,43.924 10.785,54 12.453,54 12.453,49.461 16.814,49.461
                16.814,54 18.455,54 18.455,43.924 16.814,43.924 	"/>
                <polygon
                    points="20.438,45.045 23.445,45.045 23.445,54 25.1,54 25.1,45.045 28.107,45.045 28.107,43.924 20.438,43.924 	"/>
                <polygon points="34.725,50.814 31.73,43.924 30.063,43.924 30.063,54 31.73,54 31.73,47.068 34,52.674 35.449,52.674
                37.705,47.068 37.705,54 39.373,54 39.373,43.924 37.705,43.924 	"/>
                <polygon points="43.57,43.924 41.902,43.924 41.902,54 48.205,54 48.205,52.756 43.57,52.756 	"/>
                <path d="M24.207,17.293c-0.391-0.391-1.023-0.391-1.414,0l-6,6c-0.391,0.391-0.391,1.023,0,1.414l6,6
                C22.988,30.902,23.244,31,23.5,31s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L18.914,24l5.293-5.293
                C24.598,18.316,24.598,17.684,24.207,17.293z"/>
                <path d="M36.207,17.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L40.086,24l-5.293,5.293
                c-0.391,0.391-0.391,1.023,0,1.414C34.988,30.902,35.244,31,35.5,31s0.512-0.098,0.707-0.293l6-6c0.391-0.391,0.391-1.023,0-1.414
                L36.207,17.293z"/>
            </svg>
                <span className="filebox_message">
                    {fileName}
                </span>
        </div>
    );
}

export default UploadMessage
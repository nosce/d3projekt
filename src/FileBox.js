import React, { Component } from 'react'
import './App.css'
import UploadMessage from './UploadMessage'
import { parse } from 'himalaya'

const initialState = {
    validFileType: false,
    inputField: 'file',
    draggedOver: false,
    droppedFile: false,
    fileName: ''
};

class FileBox extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragOut = this.dragOut.bind(this);
        this.dropFile = this.dropFile.bind(this);
        this.reset = this.reset.bind(this);
        this.storeFile = this.storeFile.bind(this);
        this.state = initialState;
    }

    dragOver(event) {
        event.preventDefault();
        this.setState({draggedOver: true});
    }

    dragOut(event) {
        event.preventDefault();
        this.setState({draggedOver: false});
    }

    dropFile(event) {
        event.preventDefault();
        this.setState({draggedOver: false});
        this.storeFile(event.dataTransfer.files[0]);
    }
    
    handleInput(event) {
        this.storeFile(event.target.files[0]);
    }

    storeFile(file){
        this.setState({fileName: file.name});
        var reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                this.setState({droppedFile: e.target.result});
                if(file.type === 'text/html') {
                    this.setState({validFileType: true});
                    // React wants to convert native html, so we transform the html code to json
                    const data = parse(this.state.droppedFile);
                    var newRoot = data;
                    for(var item of data) {
                        if(item.tagName === 'html') {
                            newRoot = item;
                        }
                    }
                    // Add root node for hierarchy structure
                    this.props.submitFileData(newRoot);
                    
                }
            };
        })(file).bind(this);
        reader.readAsText(file, 'utf-8');
    }

    reset() {
        this.setState(initialState);
        this.props.submitFileData(null);
    }

    render() {
        const validFileType = this.state.validFileType;
        const draggedOver = this.state.draggedOver;
        const inputField = this.state.inputField;
        const fileName = this.state.fileName;
        return (
            <div className={(draggedOver && !validFileType) ? 'filebox is-dragover' : 'filebox' && validFileType ? 'filebox uploaded' : 'filebox'}
                 onDragStart={this.dragOver}
                 onDragOver={this.dragOver}
                 onDragEnd={this.dragOut}
                 onDragLeave={this.dragOut}
                 onDrop={this.dropFile}
                 onInput={this.handleInput}>
                {(this.state.droppedFile && this.state.validFileType)
                    ? <div id="fileDelete" onClick={this.reset}>
                    <svg viewBox="0 0 60 60">
                            <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                            <path d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0   s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36   s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293   c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z" />
                    </svg>
                </div>
                    : null}
                <input type="file"
                       className="filebox_file"
                       name={inputField}
                       id={inputField}
                       accept=".html, .xhtml, .htm"/>
                <UploadMessage inputField={inputField} fileUploaded={validFileType} fileName={fileName} />
            </div>
        );
    }
}

export default FileBox
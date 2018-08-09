import React, {Component} from 'react';
import PdfSpace from '../PdfSpace/PdfSpace';
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf'
import './Pdf.css'

class Pdf extends Component{

    printDocument() {
            const input = document.getElementById('divToPrint');
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'JPEG', 0, 0);
                    // pdf.output('dataurlnewwindow');
                    pdf.save("download.pdf");
                })
            ;
    }

    render() {
        return (
            <div className="Pdf">
            <div className="mb5">
                {
                    this.props.pdfAvailable ? <a onClick={this.printDocument}>Atsisiųsti PDF</a> : null
                }
            </div>
                    <div id="divToPrint" className="mt4" style={({
                        backgroundColor: '#f5f5f5',
                        width: '210mm',
                        minHeight: '297mm',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        position: 'absolute',
                        right: '100%'
                    })}>
                        <PdfSpace/>
                        {this.props.table}
                    </div>

        </div>);
    }
}

export default Pdf;
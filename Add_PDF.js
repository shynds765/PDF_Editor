function Upload_PDF() {
    document.getElementById('file').click()
    document.getElementById('file').addEventListener('change', Add_PDF);
}

function Add_PDF() {
    let reader = new FileReader()
    const file = this.files[0];

    reader.readAsArrayBuffer(file);
    const pdf = PDFDocument.load(reader.result);
}
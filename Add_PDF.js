function Upload_PDF() {
    document.getElementById('file').addEventListener('change', Add_PDF);
    document.getElementById('file').click()
}

function Add_PDF() {
    let reader = new FileReader()
    const file = this.files[0];

    reader.addEventListener('loadend', loadPdf);
    reader.readAsArrayBuffer(file);

    async function loadPdf() {
        const editor = document.getElementById("editor");
        const pdf = await PDFLib.PDFDocument.load(reader.result); // Load PDF
        const numPages = pdf.getPageCount();
        var loadingTask = pdfjsLib.getDocument(reader.result); // Load PDF with PDF.js for pdf preview
        loadingTask.promise.then(function(pdf2) {
            for (pageNum = 1; pageNum <= numPages; pageNum++) {
                pdf2.getPage(pageNum).then(function(page) {
                    var desiredWidth = 200;
                    var viewport = page.getViewport({ scale: 1, });
                    var scale = desiredWidth / viewport.width;
                    var scaledViewport = page.getViewport({ scale: scale, });
                    // Support HiDPI-screens.
                    var outputScale = window.devicePixelRatio || 1;

                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');

                    canvas.width = Math.floor(scaledViewport.width * outputScale);
                    canvas.height = Math.floor(scaledViewport.height * outputScale);
                    canvas.style.width = Math.floor(scaledViewport.width) + "px";
                    canvas.style.height =  Math.floor(scaledViewport.height) + "px";
                    canvas.style.top = '10px';
                    canvas.style.left = (10+210*page._pageIndex)+'px';
                    canvas.className = "pdf-page";
                    editor.appendChild(canvas);
                    dragElement(canvas); // Make element dcraggable

                    var transform = outputScale !== 1
                    ? [outputScale, 0, 0, outputScale, 0, 0]
                    : null;

                    var renderContext = {
                    canvasContext: context,
                    transform: transform,
                    viewport: scaledViewport
                    };
                    page.render(renderContext);
                });
            }
        });
    }
    document.getElementById("filler-text").style.display = 'none';
}
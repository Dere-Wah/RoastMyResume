import eval.agent.occipital_lobe as agent_see
from models.data_models import IsValidResumeText, ResumeChunk, ResumeImage, ResumeResponse

import os
import subprocess
from base64 import b64encode, ReadableBuffer

# pip install python-docx reportlab pillow pypandoc pdfplumber
from docx import Document
from reportlab.pdfgen import canvas
from PIL import Image
import pypandoc
import pdfplumber


# Funzione per convertire .docx in PDF
def docx_to_pdf(docx_path, pdf_path):
    doc = Document(docx_path)
    c = canvas.Canvas(pdf_path)
    y_position = 750
    for paragraph in doc.paragraphs:
        c.drawString(100, y_position, paragraph.text)
        y_position -= 20
        if y_position < 50:
            c.showPage()  # Nuova pagina se il testo è troppo lungo
            y_position = 750
    c.save()
    print(f"PDF creato da {docx_path} in {pdf_path}")

# Funzione per convertire .txt in PDF
def text_to_pdf(txt_path, pdf_path):
    c = canvas.Canvas(pdf_path)
    with open(txt_path, "r") as f:
        y_position = 750
        for line in f.readlines():
            c.drawString(100, y_position, line.strip())
            y_position -= 20
            if y_position < 50:
                c.showPage()
                y_position = 750
    c.save()
    print(f"PDF creato da {txt_path} in {pdf_path}")

# Funzione per convertire .odt in PDF usando LibreOffice
def odt_to_pdf(odt_path, pdf_path):
    command = f"libreoffice --headless --convert-to pdf {odt_path} --outdir {os.path.dirname(pdf_path)}"
    subprocess.run(command, shell=True)
    print(f"PDF creato da {odt_path} in {pdf_path}")

# Funzione per convertire immagini (.jpg, .png) in PDF
def image_to_pdf(image_path, pdf_path):
    image = Image.open(image_path).convert("RGB")
    image.save(pdf_path)
    print(f"Immagine convertita in PDF da {image_path} in {pdf_path}")

# Funzione per convertire .pptx in PDF usando LibreOffice
def pptx_to_pdf(pptx_path, pdf_path):
    command = f"libreoffice --headless --convert-to pdf {pptx_path} --outdir {os.path.dirname(pdf_path)}"
    subprocess.run(command, shell=True)
    print(f"PDF creato da {pptx_path} in {pdf_path}")

# Funzione per convertire HTML, .md in PDF con pypandoc
def html_md_to_pdf(input_path, pdf_path):
    output = pypandoc.convert_file(input_path, to='pdf', outputfile=pdf_path)
    print(f"PDF creato da {input_path} in {pdf_path}")

# Funzione per gestire la conversione in base al formato
def convert_to_pdf(file_path):
    file_name, file_extension = os.path.splitext(file_path)
    file_extension = file_extension.lower()
    pdf_path = file_name + ".pdf"

    if file_extension == ".docx":
        docx_to_pdf(file_path, pdf_path)
    elif file_extension == ".txt":
        text_to_pdf(file_path, pdf_path)
    elif file_extension == ".odt":
        odt_to_pdf(file_path, pdf_path)
    elif file_extension == ".pptx":
        pptx_to_pdf(file_path, pdf_path)
    elif file_extension == ".jpg" or file_extension == ".png":
        image_to_pdf(file_path, pdf_path)
    elif file_extension == ".html" or file_extension == ".md":
        html_md_to_pdf(file_path, pdf_path)
    elif file_extension == ".json":
        # Per i file JSON, potrebbe essere utile creare un PDF leggibile, estraendo i dati
        with open(file_path, "r") as f:
            json_data = f.read()
        text_to_pdf(file_path, pdf_path)
    else:
        print(f"Formato {file_extension} non supportato per la conversione in PDF.")
        

# Function to process PDF with images
def parse_pdf_with_images(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        extracted_text = ""
        for i, page in enumerate(pdf.pages):
            # Extract text
            extracted_text += page.extract_text()

            # Extract images
            for img in page.images:
                image_data = img.get('image', None)  # Try 'image' first
                if image_data is None:
                    image_data = img.get('stream', None)  # Try 'stream' if 'image' is not available
                    
                if image_data is not None:  # Describe the image
                    # Convert image data to Base64 directly
                    base64_image = b64encode(image_data.get_data()).decode('utf-8')
                    # Ask agent to describe image
                    resume_image: ResumeImage = agent_see.describe_image(base64_image)
                    extracted_text += f"\n[Image description: {resume_image.description}]\n"
                
    return extracted_text

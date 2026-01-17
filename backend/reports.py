import pandas as pd
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

class ReportGenerator:
    @staticmethod
    def generate_excel(data: list):
        df = pd.DataFrame(data)
        output = BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Report')
        return output.getvalue()

    @staticmethod
    def generate_csv(data: list):
        df = pd.DataFrame(data)
        return df.to_csv(index=False)

    @staticmethod
    def generate_pdf(title: str, data: list):
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        # Header
        p.setFont("Helvetica-Bold", 16)
        p.drawString(100, height - 50, f"Tyotrack Enterprise: {title}")
        p.setFont("Helvetica", 10)
        p.drawString(100, height - 70, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Simple table-like structure
        y = height - 120
        p.setFont("Helvetica-Bold", 10)
        headers = list(data[0].keys()) if data else []
        x_offset = 100
        for header in headers:
            p.drawString(x_offset, y, str(header))
            x_offset += 100
            
        y -= 20
        p.setFont("Helvetica", 8)
        for row in data:
            if y < 50:
                p.showPage()
                y = height - 50
            x_offset = 100
            for value in row.values():
                p.drawString(x_offset, y, str(value))
                x_offset += 100
            y -= 15
            
        p.showPage()
        p.save()
        return buffer.getvalue()

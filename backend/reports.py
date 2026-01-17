import pandas as pd
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from datetime import datetime
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side

class ReportGenerator:
    @staticmethod
    def generate_excel(data: list, company_name: str = "Tyotrack Enterprise"):
        df = pd.DataFrame(data)
        output = BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Audit Report')
            workbook = writer.book
            worksheet = writer.sheets['Audit Report']
            
            # Premium Formatting
            header_fill = PatternFill(start_color='1E293B', end_color='1E293B', fill_type='solid')
            header_font = Font(color='FFFFFF', bold=True)
            
            for cell in worksheet[1]:
                cell.fill = header_fill
                cell.font = header_font
                cell.alignment = Alignment(horizontal='center')
            
            # Conditional Formatting Placeholder
            # (Logic to highlight rows based on hours > threshold)
            
        return output.getvalue()

    @staticmethod
    def generate_pdf(title: str, data: list, company_name: str = "TYOTRACK"):
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        # 🛡️ Military-Grade Branding & Watermark
        p.saveState()
        p.setFont("Helvetica-Bold", 60)
        p.setStrokeColor(HexColor("#F1F5F9"))
        p.setFillOpacity(0.05)
        p.translate(width/2, height/2)
        p.rotate(45)
        p.drawCentredString(0, 0, "RESTRICTED ACCESS")
        p.restoreState()
        
        # Header Banner
        p.setFillColor(HexColor("#0F172A"))
        p.rect(0, height - 80, width, 80, fill=1)
        
        p.setFillColor(HexColor("#FFFFFF"))
        p.setFont("Helvetica-Bold", 20)
        p.drawString(40, height - 50, f"{company_name} | INTELLIGENCE REPORT")
        
        p.setFont("Helvetica", 10)
        p.drawString(40, height - 65, f"CLASSIFICATION: ENTERPRISE CONFIDENTIAL | SEC-OPS ID: {datetime.now().strftime('%Y%m%d%H%M')}")
        
        # Data Table
        y = height - 120
        # ... table logic with zebra stripping ...
        
        p.showPage()
        p.save()
        return buffer.getvalue()

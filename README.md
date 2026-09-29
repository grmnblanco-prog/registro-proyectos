# Registro de Proyectos de Cooperación

Web app para registro de proyectos de cooperación internacional de los estudiantes.
Los grupos registran: municipio, sector, población, monto, donante.
Los expedientes se reciben vía Google Apps Script (Google Sheets) con fallback de enlace compartible.

## Sitio publicado
https://grmnblanco-prog.github.io/registro-proyectos/

## Pipeline
1. Estudiante llena el formulario
2. Se envía el expediente a Google Sheets (Apps Script)
3. Hermes procesa: investigación TerriData/IPM-DANE/datos.gov.co + ODS/OCDE
4. Reporte publicado en GitHub Pages

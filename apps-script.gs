/**
 * Receptáculo de expedientes de proyectos de cooperación (PropulsarIA)
 * ----------------------------------------------------------------
 * Cómo desplegar:
 * 1. Ve a https://script.google.com → Nuevo proyecto
 * 2. Pega este código completo
 * 3. Ve a "Implementar" → "Nueva implementación"
 *    - Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo" (tu cuenta)
 *    - Acceso: "Cualquier usuario"
 * 4. Copia la URL de la implementación (https://script.google.com/macros/s/XXXX/exec)
 * 5. Pégalo en index.html → const APPS_SCRIPT_URL = "URL_APPS_SCRIPT_AQUI";
 *
 * La hoja de cálculo se crea automáticamente en tu Drive como:
 * "Registro Proyectos Cooperación - PropulsarIA"
 */

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const ss = getOrCreateSpreadsheet();
    const sheet = ss.getSheets()[0];

    // Encabezados
    const headers = [
      "id", "fecha", "grupo", "correo", "municipio", "sector",
      "poblacion", "monto", "donante", "convocatoria", "descripcion"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    const fila = headers.map(h => {
      const v = body[h];
      if (h === "monto") return v || "";
      return (v === undefined || v === null) ? "" : String(v);
    });

    sheet.appendRow(fila);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", id: body.id || "" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet() {
  const name = "Registro Proyectos Cooperación - PropulsarIA";

  // Buscar por nombre
  const files = DriveApp.getFilesByName(name);
  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.openById(file.getId());
  }

  // Crear si no existe
  const ss = SpreadsheetApp.create(name);
  const sheet = ss.getSheets()[0];
  sheet.setName("Proyectos");
  sheet.appendRow([
    "id", "fecha", "grupo", "correo", "municipio", "sector",
    "poblacion", "monto", "donante", "descripcion"
  ]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#EDE7DB");
  return ss;
}

/** GET simple para verificar que el Web App funciona */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", app: "registro-proyectos", ts: new Date().toISOString() }))
    .setMimeType(ContentService.MimeType.JSON);
}

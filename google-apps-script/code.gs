/**
 * Sajith & Sanduni — RSVP endpoint
 * Spreadsheet: https://docs.google.com/spreadsheets/d/10Z6p0d_Vu02On-TbNtbcZPf06cXfE459hFEuOxLNQ3c/edit
 *
 * The "RSVP" tab and its headers are created automatically on the first
 * response (or run setup() once from the editor to create them now).
 */

const SPREADSHEET_ID = '10Z6p0d_Vu02On-TbNtbcZPf06cXfE459hFEuOxLNQ3c';
const SHEET_NAME = 'RSVP';

const HEADERS = [
  'Timestamp',
  'Full Name',
  'Attending',
  'Number of Guests',
  'Invited As',
  'Invitation Link',
];

const COLUMN_WIDTHS = [170, 220, 100, 140, 220, 320];

const HEADER_BG = '#6A1E33'; // burgundy
const HEADER_FG = '#FFF3F5'; // blush

/** Receives RSVP submissions from the website. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // avoid two guests writing the same row at once

    const data = (e && e.parameter) || {};
    const fullName = clean_(data.fullName);
    if (!fullName) {
      return json_({ ok: false, error: 'Full name is required.' });
    }

    const attending = String(data.attendance).toLowerCase() === 'no' ? 'No' : 'Yes';
    const guests = attending === 'Yes' ? Math.max(1, parseInt(data.guests, 10) || 1) : 0;

    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      fullName,
      attending,
      guests,
      clean_(data.invitedAs),
      clean_(data.pageUrl),
    ]);

    // Colour the Attending cell so replies are easy to scan
    const row = sheet.getLastRow();
    sheet
      .getRange(row, 3)
      .setBackground(attending === 'Yes' ? '#e6f4ea' : '#fce8e6')
      .setFontColor(attending === 'Yes' ? '#137333' : '#a50e0e')
      .setHorizontalAlignment('center');
    sheet.getRange(row, 4).setHorizontalAlignment('center');

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

/** Visiting the Web App URL in a browser shows this — handy to confirm it is live. */
function doGet() {
  return json_({ ok: true, message: 'RSVP endpoint is running.' });
}

/** Optional: run once from the Apps Script editor to create the RSVP tab and headers now. */
function setup() {
  getSheet_();
}

/** Returns the RSVP tab, creating it and its formatted header row if needed. */
function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = headerRange.getValues()[0];
  const hasHeaders = HEADERS.every(function (h, i) {
    return current[i] === h;
  });

  if (!hasHeaders) {
    if (sheet.getLastRow() > 0 && String(current[0]) !== '') {
      sheet.insertRowBefore(1); // keep any existing data below the new header
    }
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground(HEADER_BG)
      .setFontColor(HEADER_FG)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
    sheet.setRowHeight(1, 32);
    sheet.setFrozenRows(1);
    COLUMN_WIDTHS.forEach(function (w, i) {
      sheet.setColumnWidth(i + 1, w);
    });
    sheet.getRange('A:A').setNumberFormat('dd MMM yyyy, hh:mm a');
  }

  return sheet;
}

function clean_(value) {
  return String(value == null ? '' : value).trim().slice(0, 500);
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

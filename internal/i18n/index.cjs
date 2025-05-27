const path = require('path')
const fs = require('fs-extra')
const readline = require('readline')
const { google } = require('googleapis')
const jsonFormat = require('json-format')

const I18N_LOCALE = ['zh', 'En']
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const PROMPT = "Don't edit this file or you will be fire!!!"

const TOKEN_PATH = path.resolve(__dirname, 'token.json')

const SHEETS_ID = '1LIO6Oh7rs3Rmw3KLrndREKStRV_4gpbCu12tShiIFZc'

// Load client secrets from a local file.
fs.readFile(path.resolve(__dirname, 'credentials.json'), (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), mainTask)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

/**
 * @see https://docs.google.com/spreadsheets/d/1VPRuTPIjJydZPthmUrJeZvjrkk_pdO7sHWJ7t1eEq-0/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function mainTask(auth) {
  const doc = google.sheets({ version: 'v4', auth })
  doc.spreadsheets.get({ spreadsheetId: SHEETS_ID }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const sheets = res.data.sheets
    const target = {}
    I18N_LOCALE.forEach((locale) => {
      target[locale] = {}
      sheets.forEach((sheet) => (target[locale][sheet.properties.title] = {}))
    })
    let length = sheets.length
    sheets.forEach((sheet) => {
      const title = sheet.properties.title
      doc.spreadsheets.values.get(
        { spreadsheetId: SHEETS_ID, range: `${title}!A2:C` },
        (error, data) => {
          if (error) return console.log('The API returned an error: ' + error)
          const rows = data.data.values
          rows.forEach((row) => {
            I18N_LOCALE.forEach((locale, index) => (target[locale][title][row[0]] = row[index + 1]))
          })
          if (0 === (length -= 1)) {
            exportToFile(target)
          }
        },
      )
    })
  })
}

function exportToFile(data) {
  Object.keys(data).forEach((lang) => {
    const localPath = path.resolve(__dirname, '../../src/i18n/locales', lang)
    fs.ensureDirSync(localPath)
    Object.keys(data[lang]).forEach((file) => {
      const json = jsonFormat(Object.assign({ __comment__: PROMPT }, data[lang][file]), {
        type: 'space',
        size: 2,
      })

      fs.writeFileSync(`${localPath}/${file}.json`, json, 'utf-8')
    })
  })
  console.log('(=ﾟωﾟ)ﾉ setup completed')
}



const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


const algoliasearch = require('algoliasearch')
const algoliaFunctions = require('algolia-firebase-functions')

const algolia = algoliasearch(functions.config().algolia.app, functions.config().algolia.key)
const index = algolia.initIndex(functions.config().algolia.index)

exports.updatePostsIndex = functions.database.ref('/posts/{postId}').onWrite(
    event => algoliaFunctions.syncAlgoliaWithFirebase(index, event)
)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Thumbnail image
const gcs = require('@google-cloud/storage')({keyFilename: 'service-account-credentials.json'})
const spawn = require('child-process-promise').spawn

exports.generateThumbnail = functions.storage.object('/posts/{postId}')
       .onChange(event => {
         const fileBucket = object.bucket
         const object = event.data
         const filePath = object.name
         const fileName = filePath.split('/').pop()
         const bucket = gcs.bucket(fileBucket)
         const tempFilePath = `/tmp/${fileName}`
         const file = bucket.file(filePath)
         const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2')

         if (fileName.startsWith('thumb_')) {
           console.log('Already a Thumbnail.')
           return
         }

         if (!object.contentType.startsWith('image/')) {
           console.log('This is not an image')
           return
         }

         if (object.resourceState === 'not_exists') {
           console.log('This is a deletion event')
           return
         }

         return bucket.file(filePath).download({
           destination: tempFilePath
         })
         .then(() => {
           console.log('Image downloaded locally to', tempFilePath)
           return spawn('convert', [tempFilePath, '-thumbnail', '200x200', tempFilePath])
         })
         .then(() => {
           console.log('Thumbnail created')
           return bucket.upload(tempFilePath, {
             destination: thumbFilePath
           })
         })
         .then(() => {
           const thumbFile = bucket.file(thumbFilePath)
           const config = {
             action: 'read',
             expires: '01-10-2491'
           }
           return Promise.all([
             thumbFile.getSignedUrl(config),
             file.getSignedUrl(config)
           ])
         })
         .then(results => {
           const thumbResult = results[0]
           const originalResult = results[1]
           const thumbFileUrl = thumbResult[0]
           const fileUrl = originalResult[0]

           return admin.database().ref('/posts/{postId}/imageURLs').push({path: fileUrl, thumbnail: thumbFileUrl})
         })
})




/** Send SMS to article's creator with TWILIO **/


const Twilio = require('twilio')
const accountSid = functions.config().twilio.sid
const authToken = functions.config().twilio.token

const client = new Twilio(accountSid, authToken)

const twilioNumber = '+15592064531'

function validE164 (num) {
  return /^\+?[1-9]\d{1,14}$/.test(num)
}

exports.sendMessage = functions.database
       .ref('/messages/{messageId}')
       .onWrite(event => {

  const messageId = event.params.messageId

  return admin.database()
              .ref('/messages/{messageId}')
              .once('value')
              .then(snap => snap.val())
              .then(message => {
                const content = message.content
                const name = message.sender.name
                const phoneNumber = message.recipient.phoneNumber

                if (!validE164(phoneNumber)) {
                  throw new Error('Le numéro est incorrect!')
                }

                const textMessage = {
                  body: `laxislist.com - ${name}: ${content}`,
                  to: phoneNumber,
                  from: twilioNumber
                }

                return client.messages.create(textMessage)
              })
              .then(data => console.log(data.sid, 'success'))
              .catch(err => console.error(err), 'failed')
})

'use strict'
const feedparser = require('feedparser-promised')
const Book = require('../models/book')

module.exports = {

  parseRss: (req, res) => {
    const url = 'https://cts.tradepub.com/cts4/?ptnr=sf&tm=rss_Edu'
    let books = []
    let names = [
      'Javier Eguia',
      'Harlan Gramling',
      'Joye Holm',
      'Mildred Tetterton',
      'Todd Kozlowski',
      'Florrie Karlin',
      'Forest Mcavoy',
      'Bailey Maier',
      'Ileen Dendy',
      'Olimpia Trull',
      'Lon Frese',
      'Kareen Ferebee',
      'Shelli Kneeland',
      'Zulema Simmons',
      'Theron Risley',
      'Lynsey Schildgen',
      'Roderick Messier',
      'Artie Grasso',
      'Chaya Artis',
      'Monique Skiles',
      'Hiroko Hilburn',
      'Gino Normandin',
      'Eveline Alameda',
      'Bella Withrow',
      'Weldon Santamaria',
      'Trenton Shepler',
      'Tamiko Treadaway',
      'Milford Sanzone',
      'Jerri Finnen',
      'Estell Carls',
      'Lura Speaks',
      'Katheleen Oviatt',
      'Latia Tune',
      'Elmira Foote',
      'Providencia Innis',
      'Lino Groleau',
      'Parker Grissom',
      'Normand Evelyn',
      'Santos Mcconville',
      'Sung Fine',
      'Monet Tomasello',
      'Perry Ciccone',
      'Brianna Mean',
      'Kittie Murrill',
      'Veola Hamblin',
      'Maribel Gilley',
      'Fausto Sellars',
      'Janae Scroggs',
      'Johnnie Pedigo',
      'Polly Clukey'
    ]
    let editions = [
      'site point',
      'oreilly',
      'Small Business Trends',
      'Wiley',
      'Innovation & Tech Today',
      'Groovy Beets',
      'Inc.'
    ]
    feedparser.parse(url).then((items) => {
      items.forEach((item) => {
        let book = {}
        console.log()
        book.oldPrice = Math.round(Math.random() * 100)
        book.recentPrice = book.oldPrice
        book.availableBooks = 20
        book.inMarket = 20
        book.isDeleted = 0
        // console.log(`title: ${item.pubDate.toString().split(' ')[3]}`)
        book.name = item.title
        // console.log(`img: ${item.description.split('src="')[1].split('"')[0]}`)
        book.image = item.description.split('src="')[1].split('"')[0]
        let desc = ''
        if (item.description.includes('</I>')) {
          desc = item.description.split('</I>')[1]
        } else if (item.description.includes('</i>')) {
          desc = item.description.split('</i>')[1]
        } else {
          desc = item.description
        }
        let description = ''
        if (desc.includes('<')) {
          description = desc.split('<')[0]
        } else {
          description = desc
        }
        book.description = `${item.title}${description}`
        book.editionDate = item.pubDate.toString().split(' ')[3]
        book.author = names[Math.round(Math.random() * 50)]
        book.edition = editions[Math.round(Math.random() * 7)]
        // console.log(`description: ${item.title}${description}`)
        // console.log('==================')
        let db = new Book(book)
        db.save((err, data) => {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
          if (err) {
            return res.send(err)
          } else {
            console.log(data)
          }
        })
        console.log(db)
      })
    }).catch((error) => {
      console.log('error: ', error)
    }).then(
    res.json(books))
  }/*,
  createBook: (req, res, next) => {
    let db = new Book(req.body)

    var response = {}
    db.save(function (err) {
      // save() will run insert() command of MongoDB.
      // it will add new data in collection.
      if (err) {
        return res.send(err)
      } else {
        response = { 'error': false, 'message': 'Data added' }
      }
      res.json(response)
    })
  } */

}

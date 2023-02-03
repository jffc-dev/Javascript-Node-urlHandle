import axios from 'axios'
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

const loadData = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const data = await page.content()
  await browser.close()
  return data
}

export default () => {
  return async ({ url }) => {
    let bodyTitle = ''
    let $ = null
    const bodyAxios = await axios.get(url)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        return null
      })

    if (bodyAxios) {
      $ = cheerio.load(bodyAxios)
      bodyTitle = $('title').text()
    }

    if (bodyTitle === '') {
      const bodyPuppeteer = await loadData(url)
      $ = cheerio.load(bodyPuppeteer)
      bodyTitle = $('title').text()
    }

    return {
      url,
      title: bodyTitle
    }
  }
}

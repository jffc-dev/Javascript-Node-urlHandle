import { Injectable } from '@nestjs/common';
import axios from 'axios';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

interface LoadTitleUseCaseProps {
  url: string;
}
@Injectable()
export class LoadTitleUseCase {
  constructor() {}

  async loadData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    await browser.close();
    return data;
  }

  async execute(input: LoadTitleUseCaseProps): Promise<string> {
    const { url } = input;

    let bodyTitle = '';
    let $: cheerio.CheerioAPI;
    const bodyAxios: string = await axios
      .get(url)
      .then((response) => {
        return response.data as string;
      })
      .catch((error) => {
        console.log(error);
        return '';
      });

    if (bodyAxios) {
      $ = cheerio.load(bodyAxios);
      bodyTitle = $('title').text();
    }

    if (bodyTitle === '') {
      const bodyPuppeteer = await this.loadData(url);
      $ = cheerio.load(bodyPuppeteer);
      bodyTitle = $('title').text();
    }

    return bodyTitle;
  }
}

import request from 'request';
import * as cheerio from 'cheerio';

const tema = {
  shadow: "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html",
  romantic: "https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html",
  smoke: "https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html",
  burnPapper: "https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html",
  naruto: "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html",
  loveMsg: "https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html",
  msgGrass: "https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html",
  Glitch: "https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html",
  doubleHeart: "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
  coffeCup: "https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html",
  loveText: "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
  butterFly: "https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html"
}

async function pShadow(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.shadow,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

// You can create the rest of the functions in the same way as pShadow, for example:
async function pRomantic(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.romantic,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pSmoke(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.smoke,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pBurnPapper(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.burnpapper,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pNaruto(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.naruto,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pLoveMsg(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.lovemsg,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pMsgGrass(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.msggrass,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pGlitch(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.glitch,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pDoubleHeart(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.houbleheart,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}

async function pCoffeCup(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.coffecup,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}
async function pLoveText(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.lovetext,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}
async function pButterfly(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.butterfly,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = {
           url: $('div.btn-group > a').attr('href')
      };
      resolve(result);
    });
  });
}


// Export all functions as a single default export
export default {
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
};

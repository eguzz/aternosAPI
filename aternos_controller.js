const marioneta = require('puppeteer')

const aternosAPI = {
  browser : marioneta.launch({headless : true}),
  page : this.browser.newPage(),

  login_server : async () => {
      await this.page.goto('https://aternos.org/go/')
      await this.page.type('#user', "marionetagay")
      await this.page.type('#password', "marioneta1234")
      await this.page.click('#login')
      await this.page.click('#server-body')
  },

  get_ip : async () => {
      const ip = await this.page.$eval('#ip', el => el.textContent)
      return ip
  },

  start_server : async () => {
      await this.page.click('#start')
      await this.page.click('.btn btn-red')
  },

  server_status : async () => {
      const status_code = await this.page.$eval('.statuslabel-label', el => el.textContent)
      if (status_code == 'Online') {
        const time_remaining = await this.page.$eval('.server-status-label-left queue-time hidden', el => el.textContent)
        return [status_code, time_remaining]
      }
    
      return status_code
  },

  stop_server : async () => {
      await this.page.click('#stop')
  },

  restart_server : async () => {
      await this.page.click('#restart')
  },

  close_browser : async () => {
      await this.browser.close()
  },
}

module.exports = {
    aternosAPI
}

//El while true hay que implementarlo en el main.js de electron
//Toda esta información debe de estar cargada antes de renderizar el index, antes de abrir la ventana incluso
//El renderer tiene que preguntarle al main sobre esta información, y no lo contrario.
/*Quien envia y quien recibe? No tiene sentido que el canal de comunicacion se declare en el renderer porque la informacion
que se va a generar aquí ya se habrá cargado antes de renderizar el index. Aunque esto tampoco puede ser posible, el usuario va
a ejecutar la aplicacion y va a tardar 10 segundos en cargar los datos, ¿como soluciono esto?
*/
//Añadir Copy To Clipboard para la IP
//Se mantendrá la variable page y browser al ser exportadas como modulo, estan fuera de las funciones exportadas
//Quizas puedo exportar el objeto, que cada funcion sea una instancia, y el browser y page esten contenidas en el objeto, creo que si. :))))
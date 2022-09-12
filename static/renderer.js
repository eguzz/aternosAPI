let start  = document.querySelector('#start')
let restart = document.querySelector('#restart')
let stopp = document.querySelector('#stop')
let ip = document.querySelector('#ip')
let LocalStatus = document.querySelector('#status')
let timeRemaining = document.querySelector('#time')
let portapapeles = document.querySelector('#copiar')

start.addEventListener('click', async () => {
    const ip = await window.serverController.startButton
    ip.innerHTML = 'ip'

    start.style.display = 'none'
    restart.style.display = 'block'
    stopp.style.display = 'block'
})

portapapeles.addEventListener('click', async () => {
    const ip = await window.serverController.portapapeles
    ip.innerHTML = ip
    alert('Copiado al portapapeles')
})

restart.addEventListener('click', async () => {
    await window.serverController.restartButton
})

stopp.addEventListener('click', async () => {
    await window.serverController.stopButton
    restart.style.display = 'none'
    stopp.style.display = 'none'
    start.style.display = 'block' 
})

while (true) {
    const RemoteStatus = await window.serverController.serverStatus
    LocalStatus.innerHTML = RemoteStatus
    if (RemoteStatus == 'Online'){
        LocalStatus.innerHTML = RemoteStatus[0]
        timeRemaining.innerHTML = RemoteStatus[1]
        break
    }
}





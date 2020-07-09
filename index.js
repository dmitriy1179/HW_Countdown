//1 Countdown - написать функцию конструктор (или Класс) обратный отсчёт
class Countdown {
    constructor (callback, time) {
        this.time = time;
        this.startTime = time;
        this.callback = callback;
        this.interval = null;
        Countdown.timers.push(this);
        Countdown.count++
    }
    start() {
        new Promise(resolve => {
            this.time = this.startTime;
            this.interval = setInterval(() => {
                this.time--;
                this.callback(this.time);
                if (this.time === 0) {
                    clearInterval(this.interval);
                    resolve(console.log("timeout"));
                }
            }, 1000);
        });
    }
    stop() {
        console.log("interval", this.interval);
        clearInterval(this.interval);
    }
    reset() {
        this.stop();
        this.start();
    }
    static timers = [];
    static count = 0;
    static getInstanceLength() {
        return this.count;
    }
    static stopAll() {
        for (let timer of this.timers) {
            timer.stop();
        }
    }
}

const timer = new Countdown((time) => console.log("timer", time), 10)
const timer1 = new Countdown((time) => console.log("timer1", time), 10)

console.log(Countdown.getInstanceLength())

const wait = ms => 
    new Promise(resolve => {
        setTimeout(() => resolve(`Promise`), ms)
    })

async function countdownCheckFunction() {
  timer.start();
  timer1.start();
  await wait(2000);
  Countdown.stopAll();
  await wait(2000);
  timer.start();
  await wait(3000);
  timer.stop();
  await wait(3000);
  timer.start();
  await wait(3000);
  timer.reset();
}

countdownCheckFunction()

//2 Создать свою IIFE CountdownComponent
const CountdownСomponent = (function() {
    var interval = null;
    const domElement = document.createElement("div");
    domElement.setAttribute("style", "margin: 0 auto; text-align: center; font-size: 50px");
    const container = document.getElementById("el");
    const _remove = function() {
        domElement.remove();
        clearInterval(interval)
    }
    return {
        create: function(time) {
            new Promise(resolve => {
                interval = setInterval(() => {
                    time--
                    console.log("time",time)
                    container.appendChild(domElement)
                    domElement.innerHTML = time;
                    if (time === 0) {
                        resolve(console.log("timeout"));
                        return _remove()
                    }
                }, 1000);
            });
        },
        removeAll: function() {
            console.log("interval", interval)
            clearInterval(interval);
            domElement.remove();
        }
    }
})()

async function countdownСomponentCheckFunction () {
    CountdownСomponent.create(8)
    await wait(3000);
    CountdownСomponent.removeAll()
}
countdownСomponentCheckFunction()


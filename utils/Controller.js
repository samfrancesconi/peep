export default class Controller {
    constructor (config = null) {
        if (config !== null) {
            window.addEventListener('keydown', (e) => {
                let events = Object.entries(config);
                events.forEach((event) => {
                    if(e.code == event[0])
                        event[1]();
                });
            });
            return 
        }
        console.warn('Please insert a config Object when creating a new Controller');
    }  
}
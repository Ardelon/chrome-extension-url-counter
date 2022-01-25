import _ from 'lodash'
import { getStoredDays } from './manageInfo';

const listContainer = document.getElementById("list-container-new");
const goLeftButton = document.getElementById("list-container-go-left-button");
const goRightButton = document.getElementById("list-container-go-right-button")

export const renderSlider = async () => {
    const storedDays = await getStoredDays();

    if (storedDays && storedDays.storedDays) {

        storedDays.storedDays.forEach((storedDay, index) => {
            const dayContainer = document.createElement("div");
            dayContainer.classList.add("list-container-element");
            dayContainer.id = `day-container-${index}`
            dayContainer.innerText = storedDay.day;
            listContainer.appendChild(dayContainer);
        });
    }
}

const thLeft = _.throttle(function() {
    slideVisionMethod2('left')
}, 800);

const thRight = _.throttle(function() {
    slideVisionMethod2('right')
}, 800);

goLeftButton.addEventListener('click', thLeft)


goRightButton.addEventListener('click', thRight);

const slideVisionMethod2 = (direction) => {

    let frame = 64; 
    let frameRate = 6; // miliseconds
    let interval;
    let target;
    let horizontalAmount;
    let verticalAmount;
    clearInterval(interval);
    const driver = {
        'left' : () => {
      
            console.log('left');
            const belt = document.getElementById(`list-container-new`)   
            const firstChild = belt.firstElementChild;
            const style = window.getComputedStyle(firstChild);
            horizontalAmount = parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.width)
            target = Math.max(belt.scrollLeft - horizontalAmount, 0);
            console.log(belt.scrollLeft, target);
            interval = setInterval(() => {
                belt.scrollLeft = Math.max(belt.scrollLeft - Math.max(horizontalAmount/frame, 1), target);
                console.log(belt.scrollLeft, target, horizontalAmount);
                if (belt.scrollLeft === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'right' : () => {

            console.log('right');
            const belt = document.getElementById(`list-container-new`)   
            const firstChild = belt.firstElementChild;
            const style = window.getComputedStyle(firstChild);
            horizontalAmount = parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.width)
            target = Math.min(belt.scrollLeft + horizontalAmount, belt.scrollWidth - belt.clientWidth);
            console.log(belt.scrollLeft, target);

            interval = setInterval(() => {
                belt.scrollLeft = Math.min(belt.scrollLeft + Math.max(horizontalAmount/frame, 1), target);
                console.log(Math.min(belt.scrollLeft + horizontalAmount/frame, target));
                console.log(belt.scrollLeft, target, horizontalAmount);
                if (belt.scrollLeft === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'up' : () => {

            console.log('up');
            selectedBelt = Math.max(selectedBelt - 1, 0);
            const belt = document.getElementById(`selected-belt-${selectedBelt}`);
            const style = window.getComputedStyle(belt);
            verticalAmount = parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.height)
            target = Math.max(mainContainer.scrollTop - verticalAmount, 0);
            
            interval = setInterval(() => {
                mainContainer.scrollTop = Math.max(mainContainer.scrollTop - Math.max(verticalAmount/frame, 1), target)
                if (mainContainer.scrollTop === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'down' : () => {

            console.log('down');
            selectedBelt = Math.min(selectedBelt + 1, 30);
            const belt = document.getElementById(`selected-belt-${selectedBelt}`);
            const style = window.getComputedStyle(belt);
            verticalAmount = parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.height)
            target = Math.min(mainContainer.scrollTop + verticalAmount, mainContainer.scrollHeight - mainContainer.clientHeight)

            interval = setInterval(() => {
                mainContainer.scrollTop = Math.min(mainContainer.scrollTop + Math.max(verticalAmount/frame, 1), target)
                if (mainContainer.scrollTop === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        }
    }

    const driverKeys = Object.keys(driver);
    if (driverKeys.includes(direction)) {
        driver[direction]();
    } else {
        console.log('No or wrong direction');
    }
}

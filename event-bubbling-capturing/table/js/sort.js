'use strict';

function handleTableClick(event) {
    var elem = event.target; //event.target
    if(elem.classList.contains('prop__name')) {
        if(elem.hasAttribute('data-dir')) {
            var direction = Number(elem.dataset.dir) * -1;
        } else {
            var direction = 1; 
        }
        sortTable(elem.dataset.propName, direction);
        elem.setAttribute('data-dir', direction);
        document.querySelector('table').setAttribute('data-sort-by', elem.dataset.propName);
    }
}

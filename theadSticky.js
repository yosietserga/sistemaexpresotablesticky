let tableWidth = 0;
let theadLeft  = 0;
let tdDimensions = [];
let firstRun = true;

let it = setInterval(function(){
    try {
        if ( shouldSticky() ) {
            clearInterval( it );
            document.querySelector('.mdc-data-table').addEventListener('scroll',function(){
                let toLeft = document.querySelector('.mdc-data-table').scrollLeft;
                let left   = Math.round( parseFloat(theadLeft - toLeft), 2 );
                
                document.querySelector('.vuetable thead').style.left = left +'px';
                console.log([toLeft, document.querySelector('.vuetable thead').style.left]);
            });
        }
    } catch(error) { console.log( error ) }
}, 100);

window.addEventListener('hashchange', function(){
    try {
        firstRun = true;
    } catch(error) { console.log( error ) }
});

window.addEventListener('scroll', function(){
    try {
        tableWidth = document.querySelectorAll('.vuetable')[0].offsetWidth;
        if ( shouldSticky() ) {
            if (firstRun) {
                firstRun  = false;
                getTDWidth();
            }
            document.querySelector('.vuetable thead').classList.add('fixedThead');
            if (theadLeft === 0) {
                theadLeft = document.querySelector('.vuetable thead').offsetLeft;
            }
        } else {
            document.querySelector('.vuetable thead').classList.remove('fixedThead');
        }
        setTDWidth();
    } catch(error) { console.log( error ) }
});

window.addEventListener('resize', function(){
    getTDWidth();
});


function shouldRunSticky() {
    try {
        return Array.from( document.querySelectorAll('.vuetable tbody tr') ).length > 10;
    } catch(error) {
        console.log( error );
    }
}

function shouldSticky() {
    try {
        if (shouldRunSticky())
            return document.querySelector('.vuetable').getBoundingClientRect().top - getNavHeight() <= 0;
        else return false;
    } catch(error) {
        console.log( error );
    }
}

function getNavHeight() {
    return document.querySelector('.v-toolbar.v-toolbar--fixed').offsetHeight;
}

function getTDWidth() {
    let __dinmensions = [];
    let tr = document.querySelectorAll('.vuetable tbody tr')[0];
    Array.from( tr.querySelectorAll('td') ).map(td => {
        __dinmensions.push({
            width:td.offsetWidth
        })
    });
    tdDimensions = __dinmensions;
    return tdDimensions;
}

function setTDWidth() {
    document.querySelectorAll('.vuetable thead')[0].style.width = tableWidth +'px';
    
    Array.from( document.querySelectorAll('.vuetable thead th') ).map((td, i) => {
        td.style.width = tdDimensions[i]?.width +'px';
    });
    
    Array.from( document.querySelectorAll('.vuetable tbody tr')[0].querySelectorAll('td') ).map((td, i) => {
        td.style.width = tdDimensions[i]?.width +'px';
        td.style.minWidth = tdDimensions[i]?.width +'px';
    });
}
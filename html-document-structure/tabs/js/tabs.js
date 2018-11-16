
var tabsList = document.getElementsByClassName('tabs-nav')[0];
var articles = document.getElementsByClassName('tabs-content')[0];

var tabTemplate = tabsList.removeChild(tabsList.querySelector('li'));
for (var article of articles.children) {
    var newTab = tabTemplate.cloneNode(true);
    tabsList.appendChild(newTab);
    
    const tagA = newTab.children[0];
    tagA.textContent = article.dataset.tabTitle;
    tagA.classList.add('data-tab-icon', article.dataset.tabIcon);
    newTab.addEventListener('click', tabClick);
}

tabsList.getElementsByTagName('li')[0].classList.add('ui-tabs-active');
updateHidden();

function tabClick(event) {
    tabsList.getElementsByClassName('ui-tabs-active')[0].classList.remove('ui-tabs-active');
    event.currentTarget.classList.add('ui-tabs-active');
    updateHidden();
}
function updateHidden() {
    var arrTabs = [].slice.call(tabsList.children);
    for (var tab of arrTabs) {
        if(tab.classList.contains('ui-tabs-active')) {
            articles.children[arrTabs.indexOf(tab)].classList.toggle('hidden', false);
        } else {
            articles.children[arrTabs.indexOf(tab)].classList.toggle('hidden', true);
        }
    }
}


var tabsList = document.getElementsByClassName('tabs-nav')[0];
var articles = document.getElementsByClassName('tabs-content')[0];
//var tabProps = {};
//var tabTemplate = tabsList.removeChild(tabsList.querySelector('li'));
var tabTemplate = tabsList.querySelector('li');
for (var article of articles.children) {
    //tabProps.push({'name': article.dataset.tabTitle, 'icon': article.dataset.tabIcon});
    
    //var newTab = ta bsList.appendChild(tabTemplate);
    var newTab = tabTemplate.cloneNode(true);
    newTab.textContent = article.dataset.tabTitle;
    newTab.setAttribute('data-tab-icon', article.dataset.tabIcon);
    tabsList.appendChild(newTab);
    //newTab.child[0].addEventListener('click', tabClick);
}
tabsList.getElementsByTagName('li')[0].classList.add('ui-tabs-active');

function tabClick(event) {
    //var currentActive = 
    tabsList.getElementsByClassName('ui-tabs-active')[0].removeClass('ui-tabs-active');
    var el = event.target.previousElementSibling.classList.add('ui-tabs-active');
}
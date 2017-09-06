// ==UserScript==
// @name VeniUserJS
// @description Script
// @author Demetri Veni cybercrime@null.net
// @license MIT
// @version 1.0
// @include http://addmefast.com/free_points/*
// @include https://addmefast.com/free_points/*
// @include http://twitter.com/intent/follow?screen_name=*
// @include https://twitter.com/intent/follow?screen_name=*
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    // В юзерскрипты можно вставлять практически любые javascript-библиотеки.
    // Код библиотеки копируется прямо в юзерскрипт.
    // При подключении библиотеки нужно передать w в качестве параметра окна window
    // Пример: подключение jquery.min.js
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    // [4] дополнительная проверка наряду с @include
        //Ниже идёт непосредственно код скрипта
window.onload = function(){

var windowlocation = window.location.href;

// Эта функция полностью копирует другую функцию, заменяет в ней участок кода, и выполняет копию функции с измненным кодом.
function clickTheButton(){ // Нужны, чтобы открывать Pop-up окна в новой вкладке, вместо нового окна.
    var existingAttribute = document.getElementsByClassName("single_like_button btn3-wrap")[0].getAttribute('onclick'); // Из значения onclick узнаем имя функции
    var existingAttribute_ = existingAttribute.replace('();', ''); // Убираем (); в конце текста, чтобы выполнять текст как функцию в eval.
    var _number = existingAttribute_.replace('openFbLWin_', ''); // Отдельно берем из значения onclick номер функции.
    var functionCopy = eval(existingAttribute_).toString(); // Превращаем функцию в текст.
    //Делаем замены в коде изначальной функции, чтобы открывать ссылки в новой вкладке _blank.
    functionCopy = functionCopy.replace("'FB_"+_number+"','status=0,toolbar=0,width=600,height=400,resizable=0,menubar=0,location=0,directories=0'","'_blank'");
    functionCopy = functionCopy.replace('function openFbLWin_','function open_FbLWin_'); // Меняем название функции, чтобы не дублировать существующую.
    eval(functionCopy+"; open_FbLWin_"+_number+"();"); // Выполняем новую функцию.
}

    //======================================================== Если адрес страницы = addmefast.com/free_points
if(windowlocation.indexOf("addmefast.com/free_points") > -1) {
    var currentUsername = null; // создаем переменную имени текущего задания(задание аккаунт).
    //----------------------------------------------------------------------------------------------------------------
    // функция повторяется каждую секунду, пока не сработает clearInterval.
    var waitForText1 = setInterval(function(){
        if(document.getElementsByTagName("body")[0].innerText.indexOf('You will get') > -1){ // Если на странице найден текст 'You will get'
            clickTheButton(); // кликаем на кнопку Follow
            currentUsername = document.getElementsByClassName("fb_page_title")[0].textContent; // в переменную текужего задания вставляем имя нового аккаунта.
            //document.getElementsByClassName("single_like_button btn3-wrap")[0].click();
            clearInterval(waitForText1); // Выходим из этой функции повторений.
        }
    }, 1000);
    //----------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------
    // Эта функция без остановки будет каждую секунду проверять сменилось ли имя текущего задания.
    var doingcicle = setInterval(function(){
        if(document.getElementsByClassName("fb_page_title")[0].textContent !== currentUsername){ // Если имя текущего задания отличается от имени на странице
            var newUsername = document.getElementsByClassName("fb_page_title")[0].textContent; // считываем имя текущего задания
            if(newUsername.length > 0){ // если имя текущего задания существует
                clickTheButton(); // Кликаем на кнопку Follow.
                currentUsername = document.getElementsByClassName("fb_page_title")[0].textContent; // Помещаем новое имя в переменную текущего задания.
            }
        }
    }, 1000);
    //----------------------------------------------------------------------------------------------------------------
}

    //===================================================================== Если адресс страницы = twitter.com/intent/follow?screen_name=
if(windowlocation.indexOf("twitter.com/intent/follow?screen_name=") > -1) {
    var pageText = document.getElementsByTagName("body")[0].innerText; // Получаем весь текст со страницы
    if(pageText.indexOf('You need to send a request before you can start following this account') > -1){ // если на странице найден текст закрытой страницы
        document.getElementsByClassName('button')[1].click(); // кликаем вторую по счету button
    }else{
        document.getElementsByClassName('button')[0].click(); // иначе, кликаем первую по счету button.
    }

    //----------------------------------------------------------------------------------------------------------------
    // Эта функция будет каждые три секунды проверять наличие определенного текста на странице. Выход из цикла по команде clearInterval.
    var waitForText = setInterval(function(){
        bodytext = document.getElementsByTagName("body")[0].textContent; // Получаем весь текст страницы
        if(bodytext.indexOf('Following') > -1 || bodytext.indexOf('Pending') > -1){ // Если найдено слово Following или Pending
            window.close(); // закрываем страницу.
            clearInterval(waitForText); // Выходим из цикла.
        }
        if(bodytext.indexOf('Sorry, that page doesn’t exist!') > -1){ // Есди найден текст не существующей страницы
            window.close(); // закрываем страницу.
            clearInterval(waitForText); // Выходим из цикла.
        }
    }, 3000);
    //----------------------------------------------------------------------------------------------------------------
}
document.body.innerHTML += "<!-- InPaceVenimus. Advena Sum ex planeta domum. Demetri ex Amur. cybercrime@null.net. -->";
};
})(window);
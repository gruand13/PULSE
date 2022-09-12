window.addEventListener('DOMContentLoaded', ()=>{
    const body = document.querySelector('body');
    let textNodes =[];
    function recursy(element){

        // для получения всех тегов заголовков на странице и после этого передача их на сервер
        element.childNodes.forEach(node=>{
            
            // убираем все текстовые ноды (регулярное выражение все что начинается на H  и потом следует цифра (H1, H2 ...))
            if (node.nodeName.match(/^H\d/)){
                // создаем обьект для формата json чтобы передавать на сервер
                const obj ={
                    header: node.nodeName,
                    content: node.textContent.trim()
                };
                //  выведем все содержимое заголовков в массив
                textNodes.push(obj);
                
            } else {
                recursy(node);
            }
        });
    }
    recursy(body);
    // отправляем данные на сервер ( для примера это jsonplaceholder fake ipi)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(textNodes)
    })
    .then(response=> response.json())
    .then(json => console.log(json));

});
// отправляем запрос на сервер в формате json когда успешно прошло и сервер ответил трансформируем ответ в json 
//  а потом тот json который придет с сервера выводим в консоль

// можно использовать на любой странице если использовать все что внутн=ри DOMContentLoaded